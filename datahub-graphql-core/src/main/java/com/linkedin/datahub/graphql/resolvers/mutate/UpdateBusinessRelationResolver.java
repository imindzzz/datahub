package com.linkedin.datahub.graphql.resolvers.mutate;

import static com.linkedin.datahub.graphql.resolvers.ResolverUtils.*;

import com.linkedin.common.urn.CorpuserUrn;
import com.linkedin.common.urn.Urn;
import com.linkedin.datahub.graphql.QueryContext;
import com.linkedin.datahub.graphql.exception.AuthorizationException;
import com.linkedin.datahub.graphql.generated.BusinessRelationUpdateInput;
import com.linkedin.datahub.graphql.resolvers.mutate.util.SiblingsUtils;
import com.linkedin.entity.client.EntityClient;
import com.linkedin.metadata.entity.EntityService;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import javax.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class UpdateBusinessRelationResolver implements DataFetcher<CompletableFuture<Boolean>> {
  private final EntityService _entityService;
  private final EntityClient _entityClient;

  @Override
  public CompletableFuture<Boolean> get(DataFetchingEnvironment environment) throws Exception {
    final BusinessRelationUpdateInput input =
        bindArgument(environment.getArgument("input"), BusinessRelationUpdateInput.class);
    Urn targetUrn = Urn.createFromString(input.getResourceUrn());
    log.info("Updating business relation. input: {}", input.toString());

    return updateDatasetSchemaFieldBusinessRelation(targetUrn, input, environment.getContext());
  }

  // If updating schema field business relation fails, try again on a sibling until there are no
  // more
  // siblings to try. Then throw if necessary.
  private Boolean attemptUpdateDatasetSchemaFieldBusinessRelation(
      @Nonnull final Urn targetUrn,
      @Nonnull final BusinessRelationUpdateInput input,
      @Nonnull final QueryContext context,
      @Nonnull final HashSet<Urn> attemptedUrns,
      @Nonnull final List<Urn> siblingUrns) {
    attemptedUrns.add(targetUrn);
    try {
      BusinessRelationUtils.validateFieldBusinessRelationInput(
          targetUrn, input.getSubResource(), input.getSubResourceType(), _entityService);

      final Urn actor = CorpuserUrn.createFromString(context.getActorUrn());
      BusinessRelationUtils.updateFieldBusinessRelation(
          input.getBusinessRelation(), targetUrn, input.getSubResource(), actor, _entityService);
      return true;
    } catch (Exception e) {
      final Optional<Urn> siblingUrn = SiblingsUtils.getNextSiblingUrn(siblingUrns, attemptedUrns);

      if (siblingUrn.isPresent()) {
        log.warn(
            "Failed to update business relation for input {}, trying sibling urn {} now.",
            input.toString(),
            siblingUrn.get());
        return attemptUpdateDatasetSchemaFieldBusinessRelation(
            siblingUrn.get(), input, context, attemptedUrns, siblingUrns);
      } else {
        log.error(
            "Failed to perform update against input {}, {}", input.toString(), e.getMessage());
        throw new RuntimeException(
            String.format("Failed to perform update against input %s", input.toString()), e);
      }
    }
  }

  private CompletableFuture<Boolean> updateDatasetSchemaFieldBusinessRelation(
      Urn targetUrn, BusinessRelationUpdateInput input, QueryContext context) {

    return CompletableFuture.supplyAsync(
        () -> {
          if (!BusinessRelationUtils.isAuthorizedToUpdateFieldBusinessRelation(
              context, targetUrn)) {
            throw new AuthorizationException(
                "Unauthorized to perform this action. Please contact your DataHub administrator.");
          }

          if (input.getSubResourceType() == null) {
            throw new IllegalArgumentException(
                "Update business relation without subresource is not currently supported");
          }

          List<Urn> siblingUrns = SiblingsUtils.getSiblingUrns(targetUrn, _entityService);

          return attemptUpdateDatasetSchemaFieldBusinessRelation(
              targetUrn, input, context, new HashSet<>(), siblingUrns);
        });
  }
}
