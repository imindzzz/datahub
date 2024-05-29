import { Button, Empty, Row, Table, Upload, UploadProps, message } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import * as xlsx from 'xlsx';
import { ANTD_GRAY } from '../../constants';
import { UploadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';

const EmbedContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export const ExcelPreviewTab = () => {
    type RecordType = Record<string, any>;

    // TODO 最好全局状态，不然切换页面时需要重新上传文件重新显示
    const [columns, setColumns] = useState<ColumnsType<RecordType>>([]);
    const [dataSource, setDataSource] = useState<RecordType[]>([]);

    const uploadProps: UploadProps = {
        name: 'file',
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        fileList: [],
        showUploadList: false,
        onChange(info) {
            // console.log('info', info);
            if (!info.file.originFileObj) {
                return;
            }
            if (!info.file.originFileObj.name.endsWith('.xlsx') && info.file.originFileObj.name.endsWith('.xls')) {
                message.warn('file type error, support .xlsx .xls only');
                return;
            }
            const fileReader = new FileReader();
            // 读取操作完成时
            fileReader.onload = function (e) {
                try {
                    // 二进制数据
                    // console.log('e.target.result', e.target.result);
                    const dataList = xlsx.read(e.target.result, {
                        // type: 'file',
                    });
                    // console.log('dataList', dataList);

                    const jsonList: string[][] = xlsx.utils.sheet_to_json(dataList.Sheets.sheet1, { header: 1 });
                    // console.log('jsonList', jsonList);

                    const columns = jsonList.splice(0, 1)[0].map((field, index) => {
                        return {
                            dataIndex: `col_${index}`,
                            title: field,
                            width: field.length * 30,
                        };
                    });
                    // console.log('columns', columns);

                    setColumns(columns);
                    const dataSource = jsonList.map((fieldList) => {
                        return fieldList.reduce(
                            (prev, item, index) => {
                                prev[`col_${index}`] = item;
                                return prev;
                            },
                            { id: Math.floor(Math.random() * 1000000000).toString(32) },
                        );
                    });
                    // console.log('dataSource', dataSource);
                    setDataSource(dataSource);
                } catch (e) {
                    console.log('file type error, support .xlsx .xls only');
                    return;
                }
            };
            fileReader.readAsArrayBuffer(info.file.originFileObj);
        },
    };

    return (
        <EmbedContainer
            style={{
                padding: '10px',
            }}
        >
            <Row
                style={{
                    padding: '10px 0',
                }}
            >
                <Upload {...uploadProps}>
                    <Button type="primary" icon={<UploadOutlined />}>
                        Upload Excel
                    </Button>
                </Upload>
            </Row>
            {columns.length !== 0 && (
                <Table
                    // pagination={{
                    //     pageSize: 10,
                    // }}
                    scroll={{
                        x: columns.reduce((prev, item) => {
                            return prev + ((item.width as number) || 0);
                        }, 0),
                    }}
                    rowKey={'id'}
                    columns={columns}
                    dataSource={dataSource}
                />
            )}
        </EmbedContainer>
    );
};
