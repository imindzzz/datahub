import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, Select, Typography } from 'antd';
import { ViewBuilderState } from '../types';
import { DataHubViewType } from '../../../../types.generated';
import { ViewTypeLabel } from '../ViewTypeLabel';
import { ViewDefinitionBuilder } from './ViewDefinitionBuilder';
import { ANTD_GRAY } from '../../shared/constants';
import { useUserContext } from '../../../context/useUserContext';
import { ViewBuilderMode } from './types';

const StyledFormItem = styled(Form.Item)`
    margin-bottom: 8px;
`;

type Props = {
    urn?: string;
    mode: ViewBuilderMode;
    state: ViewBuilderState;
    updateState: (newState: ViewBuilderState) => void;
};

export const ViewBuilderForm = ({ urn, mode, state, updateState }: Props) => {
    const userContext = useUserContext();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(state);
    }, [state, form]);

    const setName = (name: string) => {
        updateState({
            ...state,
            name,
        });
    };

    const setDescription = (description: string) => {
        updateState({
            ...state,
            description,
        });
    };

    const setViewType = (viewType: DataHubViewType) => {
        updateState({
            ...state,
            viewType,
        });
    };

    const canManageGlobalViews = userContext?.platformPrivileges?.manageGlobalViews || false;
    const isEditing = urn !== undefined;

    return (
        <span data-testid="view-builder-form">
            <Form form={form} initialValues={state} layout="vertical">
                <StyledFormItem label={<Typography.Text strong>名称</Typography.Text>}>
                    <Typography.Paragraph>视图名称 </Typography.Paragraph>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a name for your View.',
                            },
                            { whitespace: true },
                            { min: 1, max: 50 },
                        ]}
                        hasFeedback
                    >
                        <Input
                            data-testid="view-name-input"
                            placeholder="数据分析"
                            onChange={(event) => setName(event.target.value)}
                            disabled={mode === ViewBuilderMode.PREVIEW}
                        />
                    </Form.Item>
                </StyledFormItem>
                <StyledFormItem label={<Typography.Text strong>描述</Typography.Text>}>
                    <Typography.Paragraph>视图描述</Typography.Paragraph>
                    <Form.Item name="description" rules={[{ whitespace: true }, { min: 1, max: 500 }]} hasFeedback>
                        <Input.TextArea
                            data-testid="view-description-input"
                            placeholder="这个视图用于数据分析"
                            onChange={(event) => setDescription(event.target.value)}
                            disabled={mode === ViewBuilderMode.PREVIEW}
                        />
                    </Form.Item>
                </StyledFormItem>
                <StyledFormItem label={<Typography.Text strong>类型</Typography.Text>}>
                    <Typography.Paragraph>视图类型</Typography.Paragraph>
                    <Form.Item name="viewType">
                        <Select
                            onSelect={(value) => setViewType(value as DataHubViewType)}
                            disabled={!canManageGlobalViews || isEditing || mode === ViewBuilderMode.PREVIEW}
                        >
                            <Select.Option value={DataHubViewType.Personal}>
                                <ViewTypeLabel type={DataHubViewType.Personal} color={ANTD_GRAY[9]} />
                            </Select.Option>
                            <Select.Option value={DataHubViewType.Global}>
                                <ViewTypeLabel type={DataHubViewType.Global} color={ANTD_GRAY[9]} />
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </StyledFormItem>
                <StyledFormItem label={<Typography.Text strong>过滤器</Typography.Text>} style={{ marginBottom: 8 }}>
                    <Typography.Paragraph>
                        选择应用于视图的过滤器
                    </Typography.Paragraph>
                </StyledFormItem>
            </Form>
            <ViewDefinitionBuilder mode={mode} state={state} updateState={updateState} />
        </span>
    );
};
