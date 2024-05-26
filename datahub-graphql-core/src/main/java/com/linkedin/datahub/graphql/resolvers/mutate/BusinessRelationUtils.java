package com.linkedin.datahub.graphql.resolvers.mutate;

import static com.linkedin.datahub.graphql.resolvers.mutate.MutationUtils.*;

import com.datahub.authorization.ConjunctivePrivilegeGroup;
import com.datahub.authorization.DisjunctivePrivilegeGroup;
import com.google.common.collect.ImmutableList;
import com.linkedin.common.urn.Urn;
import com.linkedin.datahub.graphql.QueryContext;
import com.linkedin.datahub.graphql.authorization.AuthorizationUtils;
import com.linkedin.datahub.graphql.generated.SubResourceType;
import com.linkedin.metadata.Constants;
import com.linkedin.metadata.authorization.PoliciesConfig;
import com.linkedin.metadata.entity.EntityService;
import com.linkedin.metadata.entity.EntityUtils;
import com.linkedin.schema.EditableSchemaFieldInfo;
import com.linkedin.schema.EditableSchemaMetadata;
import io.datahubproject.metadata.context.OperationContext;
import javax.annotation.Nonnull;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class BusinessRelationUtils {
  private static final ConjunctivePrivilegeGroup ALL_PRIVILEGES_GROUP =
      new ConjunctivePrivilegeGroup(
          ImmutableList.of(PoliciesConfig.EDIT_ENTITY_PRIVILEGE.getType()));

  private BusinessRelationUtils() {}

  public static void updateFieldBusinessRelation(
      @Nonnull OperationContext opContext,
      String newBusinessRelation,
      Urn resourceUrn,
      String fieldPath,
      Urn actor,
      EntityService<?> entityService) {
    EditableSchemaMetadata editableSchemaMetadata =
        (EditableSchemaMetadata)
            EntityUtils.getAspectFromEntity(
                opContext,
                resourceUrn.toString(),
                Constants.EDITABLE_SCHEMA_METADATA_ASPECT_NAME,
                entityService,
                new EditableSchemaMetadata());
    EditableSchemaFieldInfo editableFieldInfo =
        getFieldInfoFromSchema(editableSchemaMetadata, fieldPath);

    editableFieldInfo.setBusinessRelation(newBusinessRelation);

    persistAspect(
        opContext,
        resourceUrn,
        Constants.EDITABLE_SCHEMA_METADATA_ASPECT_NAME,
        editableSchemaMetadata,
        actor,
        entityService);
  }

  public static Boolean validateFieldBusinessRelationInput(
      @Nonnull OperationContext opContext,
      Urn resourceUrn,
      String subResource,
      SubResourceType subResourceType,
      EntityService<?> entityService) {
    if (!entityService.exists(opContext, resourceUrn, true)) {
      throw new IllegalArgumentException(
          String.format("Failed to update %s. %s does not exist.", resourceUrn, resourceUrn));
    }

    validateSubresourceExists(opContext, resourceUrn, subResource, subResourceType, entityService);

    return true;
  }

  public static boolean isAuthorizedToUpdateFieldBusinessRelation(
      @Nonnull QueryContext context, Urn targetUrn) {
    final DisjunctivePrivilegeGroup orPrivilegeGroups =
        new DisjunctivePrivilegeGroup(
            ImmutableList.of(
                ALL_PRIVILEGES_GROUP,
                new ConjunctivePrivilegeGroup(
                    ImmutableList.of(
                        PoliciesConfig.EDIT_DATASET_COL_DESCRIPTION_PRIVILEGE.getType()))));

    return AuthorizationUtils.isAuthorized(
        context.getAuthorizer(),
        context.getActorUrn(),
        targetUrn.getEntityType(),
        targetUrn.toString(),
        orPrivilegeGroups);
  }
}
