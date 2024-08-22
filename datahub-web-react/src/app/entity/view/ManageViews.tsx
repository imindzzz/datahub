import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { ViewsList } from './ViewsList';

const PageContainer = styled.div`
    padding-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const PageHeaderContainer = styled.div`
    && {
        padding-left: 24px;
    }
`;

const PageTitle = styled(Typography.Title)`
    && {
        margin-bottom: 12px;
    }
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

/**
 * Component used for displaying the 'Manage Views' experience.
 */
export const ManageViews = () => {
    return (
        <PageContainer>
            <PageHeaderContainer>
                <PageTitle level={3}>管理视图</PageTitle>
                <Typography.Paragraph type="secondary">
                    创建、编辑、删除你的视图，视图可以让你保存和分享查询条件
                </Typography.Paragraph>
            </PageHeaderContainer>
            <ListContainer>
                <ViewsList />
            </ListContainer>
        </PageContainer>
    );
};
