import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, UploadProps, message } from 'antd';
import { useState } from 'react';
import * as xlsx from 'xlsx';
import {
    useUpdateBusinessDescriptionMutation,
    useUpdateBusinessRelationMutation,
} from '../../../../../../../graphql/mutations.generated';
import { useMutationUrn, useRefetch } from '../../../../../shared/EntityContext';
import { useSchemaRefetch } from '../../../../../shared/tabs/Dataset/Schema/SchemaContext';
import DOMPurify from 'dompurify';
import { SubResourceType } from '../../../../../../../types.generated';
import { useGetEntityWithSchema } from '../../../../../shared/tabs/Dataset/Schema/useGetEntitySchema';

interface ImportSchemaModalProps {
    open: boolean;
    onClose: () => void;
}
export default function ImportSchemaModal(props: ImportSchemaModalProps) {
    const { open, onClose } = props;

    const urn = useMutationUrn();
    const refetch = useRefetch();
    const schemaRefetch = useSchemaRefetch();
    const [updateBusinessDescription] = useUpdateBusinessDescriptionMutation();
    const [updateBusinessRelation] = useUpdateBusinessRelationMutation();

    const { entityWithSchema } = useGetEntityWithSchema();

    const refresh: any = () => {
        refetch?.();
        schemaRefetch?.();
    };

    const [loading, setLoading] = useState<{ total: number; done: number }>();

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
            fileReader.onload = async (e) => {
                try {
                    // 二进制数据
                    // console.log('e.target.result', e.target.result);
                    const dataList = xlsx.read(e.target.result, {
                        // type: 'file',
                    });
                    // console.log('dataList', dataList);

                    const jsonList: string[][] = xlsx.utils.sheet_to_json(
                        dataList.Sheets.sheet1 || dataList.Sheets.Sheet1,
                        { header: 1 },
                    );
                    // console.log('jsonList', jsonList);

                    // const columns = jsonList.splice(0, 1)[0].map((field, index) => {
                    //     return {
                    //         dataIndex: `col_${index}`,
                    //         title: field,
                    //         width: field.length * 30,
                    //     };
                    // });
                    // console.log('columns', columns);

                    // setColumns(columns);
                    const dataSource = jsonList;
                    // const dataSource = jsonList.map((fieldList) => {
                    //     return fieldList.reduce(
                    //         (prev, item, index) => {
                    //             prev[`col_${index}`] = item;
                    //             return prev;
                    //         },
                    //         { id: Math.floor(Math.random() * 1000000000).toString(32) },
                    //     );
                    // });

                    // console.log('entityWithSchema?.schemaMetadata?.fields', entityWithSchema?.schemaMetadata?.fields);
                    const rows = dataSource.filter((x) => {
                        const field = entityWithSchema?.schemaMetadata?.fields.find((y) => {
                            return y.fieldPath === x[0];
                        });
                        return !!field;
                    });
                    // console.log('rows', rows);

                    for (let i = 0; i < rows.length; i++) {
                        setLoading({ total: rows.length, done: i });
                        const dataItem = rows[i];
                        const field = entityWithSchema?.schemaMetadata?.fields.find((x) => {
                            return x.fieldPath === dataItem[0];
                        });
                        if (!field) continue;

                        // console.log('updateBusinessDescription', field.fieldPath, dataItem[1]);
                        // console.log('updateBusinessRelation', field.fieldPath, dataItem[2]);

                        try {
                            await updateBusinessDescription({
                                variables: {
                                    input: {
                                        businessDescription: DOMPurify.sanitize(dataItem[1]),
                                        resourceUrn: urn,
                                        subResource: field.fieldPath,
                                        subResourceType: SubResourceType.DatasetField,
                                    },
                                },
                            });
                            await updateBusinessRelation({
                                variables: {
                                    input: {
                                        businessRelation: DOMPurify.sanitize(dataItem[2]),
                                        resourceUrn: urn,
                                        subResource: field.fieldPath,
                                        subResourceType: SubResourceType.DatasetField,
                                    },
                                },
                            });
                        } catch {
                            // nothing
                        }
                    }
                    setLoading(undefined);
                    refresh();

                    // console.log('dataSource', dataSource);
                    // setDataSource(dataSource);
                } catch (e) {
                    console.log('file type error, support .xlsx .xls only');
                    return;
                }
            };
            fileReader.readAsArrayBuffer(info.file.originFileObj);
        },
    };
    return (
        <Modal open={open} onCancel={onClose} title="Import Schema" footer={false}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Upload {...uploadProps}>
                    <Button type="primary" icon={<UploadOutlined />} loading={!!loading}>
                        Upload Excel {loading ? `${loading.done} / ${loading.total}` : null}
                    </Button>
                </Upload>
            </div>
        </Modal>
    );
}
