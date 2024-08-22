import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Modal, Typography } from 'antd';
import { DEFAULT_BUILDER_STATE, ViewBuilderState } from '../types';
import { ViewBuilderForm } from './ViewBuilderForm';
import ClickOutside from '../../../shared/ClickOutside';
import { ViewBuilderMode } from './types';
import { getModalDomContainer } from '../../../../utils/focus';

const modalWidth = 700;
const modalStyle = { top: 40 };
const modalBodyStyle = { paddingRight: 60, paddingLeft: 60, paddingBottom: 40 };

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SaveButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: right;
`;

const CancelButton = styled(Button)`
    margin-right: 12px;
`;

type Props = {
    mode: ViewBuilderMode;
    urn?: string;
    initialState?: ViewBuilderState;
    onSubmit: (input: ViewBuilderState) => void;
    onCancel?: () => void;
};

const getTitleText = (mode, urn) => {
    if (mode === ViewBuilderMode.PREVIEW) {
        return 'Preview View';
    }
    return urn !== undefined ? '编辑视图' : '创建视图';
};

export const ViewBuilderModal = ({ mode, urn, initialState, onSubmit, onCancel }: Props) => {
    const [viewBuilderState, setViewBuilderState] = useState<ViewBuilderState>(initialState || DEFAULT_BUILDER_STATE);

    useEffect(() => {
        setViewBuilderState(initialState || DEFAULT_BUILDER_STATE);
    }, [initialState]);

    const confirmClose = () => {
        Modal.confirm({
            title: '退出视图编辑',
            content: `确定退出吗？ 所有改变将会丢失`,
            onOk() {
                onCancel?.();
            },
            onCancel() { },
            okText: '是',
            maskClosable: true,
            closable: true,
        });
    };

    const canSave = viewBuilderState.name && viewBuilderState.viewType && viewBuilderState?.definition?.filter;
    const titleText = getTitleText(mode, urn);

    return (
        <ClickOutside onClickOutside={confirmClose} wrapperClassName="test-builder-modal">
            <Modal
                wrapClassName="view-builder-modal"
                footer={null}
                title={
                    <TitleContainer>
                        <Typography.Text>{titleText}</Typography.Text>
                    </TitleContainer>
                }
                style={modalStyle}
                bodyStyle={modalBodyStyle}
                visible
                width={modalWidth}
                onCancel={onCancel}
                data-testid="view-modal"
                getContainer={getModalDomContainer}
            >
                <ViewBuilderForm urn={urn} mode={mode} state={viewBuilderState} updateState={setViewBuilderState} />
                <SaveButtonContainer>
                    <CancelButton data-testid="view-builder-cancel" onClick={onCancel}>
                        取消
                    </CancelButton>
                    {mode === ViewBuilderMode.EDITOR && (
                        <Button
                            data-testid="view-builder-save"
                            type="primary"
                            disabled={!canSave}
                            onClick={() => onSubmit(viewBuilderState)}
                        >
                            保存
                        </Button>
                    )}
                </SaveButtonContainer>
            </Modal>
        </ClickOutside>
    );
};
