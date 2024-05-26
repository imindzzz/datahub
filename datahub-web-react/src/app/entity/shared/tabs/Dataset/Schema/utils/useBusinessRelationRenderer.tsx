import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { EditableSchemaMetadata, SchemaField, SubResourceType } from '../../../../../../../types.generated';
import DescriptionField from '../../../../../dataset/profile/schema/components/SchemaDescriptionField';
import { pathMatchesNewPath } from '../../../../../dataset/profile/schema/utils/utils';
import { useUpdateBusinessRelationMutation } from '../../../../../../../graphql/mutations.generated';
import { useMutationUrn, useRefetch } from '../../../../EntityContext';
import { useSchemaRefetch } from '../SchemaContext';

export default function useBusinessRelationRenderer(editableSchemaMetadata: EditableSchemaMetadata | null | undefined) {
    const urn = useMutationUrn();
    const refetch = useRefetch();
    const schemaRefetch = useSchemaRefetch();
    const [updateBusinessRelation] = useUpdateBusinessRelationMutation();
    const [expandedRows, setExpandedRows] = useState({});

    const refresh: any = () => {
        refetch?.();
        schemaRefetch?.();
    };

    return (businessRelation: string, record: SchemaField, index: number): JSX.Element => {
        const relevantEditableFieldInfo = editableSchemaMetadata?.editableSchemaFieldInfo.find(
            (candidateEditableFieldInfo) => pathMatchesNewPath(candidateEditableFieldInfo.fieldPath, record.fieldPath),
        );
        const displayedDescription = relevantEditableFieldInfo?.businessRelation || businessRelation;
        const sanitizedDescription = DOMPurify.sanitize(displayedDescription);
        const original = record.businessRelation ? DOMPurify.sanitize(record.businessRelation) : undefined;

        const handleExpandedRows = (expanded) => setExpandedRows((prev) => ({ ...prev, [index]: expanded }));

        return (
            <DescriptionField
                onExpanded={handleExpandedRows}
                expanded={!!expandedRows[index]}
                description={sanitizedDescription}
                original={original}
                isEdited={false}
                onUpdate={(updatedBusinessRelation) =>
                    updateBusinessRelation({
                        variables: {
                            input: {
                                businessRelation: DOMPurify.sanitize(updatedBusinessRelation),
                                resourceUrn: urn,
                                subResource: record.fieldPath,
                                subResourceType: SubResourceType.DatasetField,
                            },
                        },
                    }).then(refresh)
                }
                isReadOnly
            />
        );
    };
}
