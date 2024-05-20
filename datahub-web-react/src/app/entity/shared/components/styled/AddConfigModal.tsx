import React, { useEffect, useState } from 'react';
import { message, Modal, Button, Form, Input, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useEntityData, useEntityUpdate, useMutationUrn } from '../../EntityContext';
import analytics, { EventType, EntityActionType } from '../../../../analytics';
import { useUserContext } from '../../../../context/useUserContext';
import { getModalDomContainer } from '../../../../../utils/focus';
import { GenericEntityUpdate } from '../../types';

type AddLinkProps = {
    buttonProps?: Record<string, unknown>;
    refetch?: () => Promise<any>;
};

export const AddConfigModal = ({ buttonProps, refetch }: AddLinkProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const mutationUrn = useMutationUrn();
    const user = useUserContext();
    const { entityType } = useEntityData();
    const { entityData } = useEntityData();

    const hasConfig = !!entityData?.editableProperties?.assetName;

    const updateEntity = useEntityUpdate<GenericEntityUpdate>();

    const [form] = Form.useForm();

    const showModal = () => {
        if (entityData?.editableProperties) {
            form.setFieldsValue({
                assetName: entityData?.editableProperties?.assetName || '',
                assetDescription: entityData?.editableProperties?.assetDescription || '',
                assetPosition: entityData?.editableProperties?.assetPosition || '',
                assetVersion: entityData?.editableProperties?.assetVersion || '',
                assetVersionDescription: entityData?.editableProperties?.assetVersionDescription || '',
                assetRemark: entityData?.editableProperties?.assetRemark || '',
            });
        }
        setIsModalVisible(true);
    };
    const handleRemove = () => {
        Modal.confirm({
            title: `Do you want to remove config?`,
            content: `Are you sure you want to remove the config?`,
            onOk: async () => {
                console.log('handleRemove');
                await updateEntity?.({
                    variables: {
                        urn: mutationUrn,
                        input: {
                            editableProperties: {
                                description: entityData?.editableProperties?.description || '',
                                assetName: '',
                                assetDescription: '',
                                assetPosition: '',
                                assetVersion: '',
                                assetVersionDescription: '',
                                assetRemark: '',
                            },
                        },
                    },
                });
                message.success({ content: 'Success', duration: 2 });
            },
        });
    };

    const handleClose = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const handleAdd = async (formData: any) => {
        if (user?.urn) {
            try {
                await updateEntity?.({
                    variables: {
                        urn: mutationUrn,
                        input: {
                            editableProperties: {
                                description: entityData?.editableProperties?.description || '',
                                assetName: formData.assetName,
                                assetDescription: formData.assetDescription,
                                assetPosition: formData.assetPosition,
                                assetVersion: formData.assetVersion,
                                assetVersionDescription: formData.assetVersionDescription,
                                assetRemark: formData.assetRemark,
                            },
                        },
                    },
                });
                message.success({ content: 'Success', duration: 2 });
                analytics.event({
                    type: EventType.EntityActionEvent,
                    entityType,
                    entityUrn: mutationUrn,
                    actionType: EntityActionType.UpdateDescription,
                });
            } catch (e: unknown) {
                message.destroy();
                if (e instanceof Error) {
                    message.error({ content: `Failed to add config: \n ${e.message || ''}`, duration: 3 });
                }
            }
            refetch?.();
            handleClose();
        } else {
            message.error({ content: `Error adding config: no user`, duration: 2 });
        }
    };

    return (
        <>
            {hasConfig ? (
                <Space>
                    <Button
                        data-testid="edit-config-button"
                        icon={<EditOutlined />}
                        onClick={showModal}
                        {...buttonProps}
                    >
                        Edit Config
                    </Button>
                    <Button
                        data-testid="remove-config-button"
                        icon={<DeleteOutlined />}
                        onClick={handleRemove}
                        {...buttonProps}
                    >
                        Remove Config
                    </Button>
                </Space>
            ) : (
                <Button data-testid="add-config-button" icon={<PlusOutlined />} onClick={showModal} {...buttonProps}>
                    Add Config
                </Button>
            )}

            <Modal
                title="Config"
                visible={isModalVisible}
                destroyOnClose
                onCancel={handleClose}
                footer={[
                    <Button type="text" onClick={handleClose}>
                        Cancel
                    </Button>,
                    <Button data-testid="add-link-modal-add-button" form="addLinkForm" key="submit" htmlType="submit">
                        Save
                    </Button>,
                ]}
                getContainer={getModalDomContainer}
            >
                <Form form={form} name="addLinkForm" onFinish={handleAdd} layout="vertical">
                    <Form.Item
                        data-testid="add-config-modal-assetName"
                        name="assetName"
                        label="Asset Name"
                        tooltip="Please enter English"
                        rules={[
                            {
                                required: true,
                                message: 'A Asset Name is required.',
                            },
                        ]}
                    >
                        <Input placeholder="A Asset Name is required" autoFocus />
                    </Form.Item>
                    <Form.Item
                        data-testid="add-config-modal-assetDescription"
                        name="assetDescription"
                        label="Asset Description"
                        rules={[
                            {
                                required: true,
                                message: 'A Asset Description is required.',
                            },
                        ]}
                    >
                        <Input placeholder="A Asset Description is required" autoFocus />
                    </Form.Item>
                    <Form.Item
                        data-testid="add-config-modal-assetPosition"
                        name="assetPosition"
                        label="Asset Position"
                        rules={[
                            {
                                required: true,
                                message: 'A Asset Position is required.',
                            },
                        ]}
                    >
                        <Input placeholder="A Asset Position is required" autoFocus />
                    </Form.Item>
                    <Form.Item
                        data-testid="add-config-modal-assetVersion"
                        name="assetVersion"
                        label="Asset Version"
                        rules={[
                            {
                                required: true,
                                message: 'A Asset Version is required.',
                            },
                        ]}
                    >
                        <Input placeholder="A Asset Version is required" autoFocus />
                    </Form.Item>
                    <Form.Item
                        data-testid="add-config-modal-assetVersionDescription"
                        name="assetVersionDescription"
                        label="Asset Version Description"
                        rules={[
                            {
                                required: true,
                                message: 'A Asset Version Description is required.',
                            },
                        ]}
                    >
                        <Input placeholder="A Asset Version Description is required" autoFocus />
                    </Form.Item>
                    <Form.Item
                        data-testid="add-config-modal-assetRemark"
                        name="assetRemark"
                        label="Asset Remark"
                        rules={[
                            {
                                required: true,
                                message: 'A Asset Remark is required.',
                            },
                        ]}
                    >
                        <Input placeholder="A Asset Remark is required" autoFocus />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
