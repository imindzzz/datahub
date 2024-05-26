import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { EditableSchemaMetadata, SchemaField, SubResourceType } from '../../../../../../../types.generated';
import DescriptionField from '../../../../../dataset/profile/schema/components/SchemaDescriptionField';
import { pathMatchesNewPath } from '../../../../../dataset/profile/schema/utils/utils';
import { useUpdateBusinessDescriptionMutation } from '../../../../../../../graphql/mutations.generated';
import { useMutationUrn, useRefetch } from '../../../../EntityContext';
import { useSchemaRefetch } from '../SchemaContext';

export default function useBusinessDescriptionRenderer(editableSchemaMetadata: EditableSchemaMetadata | null | undefined) {
    const urn = useMutationUrn();
    const refetch = useRefetch();
    const schemaRefetch = useSchemaRefetch();
    const [updateBusinessDescription] = useUpdateBusinessDescriptionMutation();
    const [expandedRows, setExpandedRows] = useState({});

    const refresh: any = () => {
        refetch?.();
        schemaRefetch?.();
    };

    return (businessDescription: string, record: SchemaField, index: number): JSX.Element => {
        const relevantEditableFieldInfo = editableSchemaMetadata?.editableSchemaFieldInfo.find(
            (candidateEditableFieldInfo) => pathMatchesNewPath(candidateEditableFieldInfo.fieldPath, record.fieldPath),
        );
        const displayedDescription = relevantEditableFieldInfo?.businessDescription || businessDescription;
        const sanitizedDescription = DOMPurify.sanitize(displayedDescription);
        const original = record.businessDescription ? DOMPurify.sanitize(record.businessDescription) : undefined;

        const handleExpandedRows = (expanded) => setExpandedRows((prev) => ({ ...prev, [index]: expanded }));

        return (
            <DescriptionField
                onExpanded={handleExpandedRows}
                expanded={!!expandedRows[index]}
                description={sanitizedDescription}
                original={original}
                isEdited={false}
                onUpdate={(updatedBusinessDescription) =>
                    updateBusinessDescription({
                        variables: {
                            input: {
                                businessDescription: DOMPurify.sanitize(updatedBusinessDescription),
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
