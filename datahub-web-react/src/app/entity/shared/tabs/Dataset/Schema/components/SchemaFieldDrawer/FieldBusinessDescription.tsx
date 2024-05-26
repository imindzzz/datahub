import { EditOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import styled from 'styled-components';
import { SectionHeader, StyledDivider } from './components';
import UpdateDescriptionModal from '../../../../../components/legacy/DescriptionModal';
import { EditableSchemaFieldInfo, SchemaField, SubResourceType } from '../../../../../../../../types.generated';
import DescriptionSection from '../../../../../containers/profile/sidebar/AboutSection/DescriptionSection';
import { useEntityData, useMutationUrn, useRefetch } from '../../../../../EntityContext';
import { useSchemaRefetch } from '../../SchemaContext';
import { useUpdateBusinessDescriptionMutation } from '../../../../../../../../graphql/mutations.generated';
import analytics, { EntityActionType, EventType } from '../../../../../../../analytics';
import SchemaEditableContext from '../../../../../../../shared/SchemaEditableContext';

const DescriptionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const EditIcon = styled(Button)`
    border: none;
    box-shadow: none;
    height: 20px;
    width: 20px;
`;

interface Props {
    expandedField: SchemaField;
    editableFieldInfo?: EditableSchemaFieldInfo;
}

export default function FieldBusinessDescription({ expandedField, editableFieldInfo }: Props) {
    const isSchemaEditable = React.useContext(SchemaEditableContext);
    const urn = useMutationUrn();
    const refetch = useRefetch();
    const schemaRefetch = useSchemaRefetch();
    const [updateBusinessDescriptionMutation] = useUpdateBusinessDescriptionMutation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { entityType } = useEntityData();

    const sendAnalytics = () => {
        analytics.event({
            type: EventType.EntityActionEvent,
            actionType: EntityActionType.UpdateSchemaBusinessDescription,
            entityType,
            entityUrn: urn,
        });
    };

    const refresh: any = () => {
        refetch?.();
        schemaRefetch?.();
    };

    const onSuccessfulMutation = () => {
        refresh();
        sendAnalytics();
        message.destroy();
        message.success({ content: 'Updated!', duration: 2 });
    };

    const onFailMutation = (e) => {
        message.destroy();
        if (e instanceof Error) message.error({ content: `Proposal Failed! \n ${e.message || ''}`, duration: 2 });
    };

    const generateMutationVariables = (updatedBusinessDescription: string) => ({
        variables: {
            input: {
                businessDescription: DOMPurify.sanitize(updatedBusinessDescription),
                resourceUrn: urn,
                subResource: expandedField.fieldPath,
                subResourceType: SubResourceType.DatasetField,
            },
        },
    });

    const displayedDescription = editableFieldInfo?.businessDescription || expandedField.businessDescription;

    return (
        <>
            <DescriptionWrapper>
                <div>
                    <SectionHeader>Business Description</SectionHeader>
                    <DescriptionSection description={displayedDescription || ''} isExpandable />
                </div>
                {isSchemaEditable && (
                    <EditIcon
                        data-testid="edit-field-description"
                        onClick={() => setIsModalVisible(true)}
                        icon={<EditOutlined />}
                    />
                )}
                {isModalVisible && (
                    <UpdateDescriptionModal
                        title={displayedDescription ? 'Update business description' : 'Add business description'}
                        description={displayedDescription || ''}
                        original={expandedField.businessDescription || ''}
                        onClose={() => setIsModalVisible(false)}
                        onSubmit={(updatedBusinessDescription: string) => {
                            message.loading({ content: 'Updating...' });
                            updateBusinessDescriptionMutation(generateMutationVariables(updatedBusinessDescription))
                                .then(onSuccessfulMutation)
                                .catch(onFailMutation);
                            setIsModalVisible(false);
                        }}
                        isAddDesc={!displayedDescription}
                    />
                )}
            </DescriptionWrapper>
            <StyledDivider />
        </>
    );
}
