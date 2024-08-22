import React, { useState } from 'react';
import { ENTITY_PROFILE_OWNERS_ID } from '../../../../../../onboarding/config/EntityProfileOnboardingConfig';
import { AddConfigModal } from '../../../../components/styled/AddConfigModal';
import styled from 'styled-components';
import { useEntityData, useRefetch } from '../../../../EntityContext';
import { SidebarHeader } from '../SidebarHeader';

const AddConfigWrapper = styled.div``;

const ConfigWrapper = styled.div`
    padding-bottom: 10px;
    > .item {
        padding: 5px 0;
        > .key {
            white-space: nowrap;
            padding-right: 10px;
        }
        > .value {
            color: rgba(0, 0, 0, 0.45);
        }
    }
`;

interface Props {
    properties?: any;
    readOnly?: boolean;
}

export const SidebarConfigSection = ({ properties, readOnly }: Props) => {
    const { entityData } = useEntityData();
    const hasConfig = !!entityData?.editableProperties?.assetName;
    const refetch = useRefetch();
    return (
        <AddConfigWrapper id={ENTITY_PROFILE_OWNERS_ID}>
            <SidebarHeader title="资产配置" />
            {hasConfig && (
                <ConfigWrapper>
                    <div className="item">
                        <div className="key">资产名</div>
                        <div className="value">{entityData?.editableProperties?.assetName}</div>
                    </div>
                    <div className="item">
                        <div className="key">资产描述</div>
                        <div className="value">{entityData?.editableProperties?.assetDescription}</div>
                    </div>
                    <div className="item">
                        <div className="key">资产位置</div>
                        <div className="value">{entityData?.editableProperties?.assetPosition}</div>
                    </div>
                    <div className="item">
                        <div className="key">资产版本</div>
                        <div className="value">{entityData?.editableProperties?.assetVersion}</div>
                    </div>
                    <div className="item">
                        <div className="key">资产版本描述</div>
                        <div className="value">{entityData?.editableProperties?.assetVersionDescription}</div>
                    </div>
                    <div className="item">
                        <div className="key">资产备注</div>
                        <div className="value">{entityData?.editableProperties?.assetRemark}</div>
                    </div>
                    
                </ConfigWrapper>
            )}
            {!readOnly && <AddConfigModal refetch={refetch} />}
        </AddConfigWrapper>
    );
};
