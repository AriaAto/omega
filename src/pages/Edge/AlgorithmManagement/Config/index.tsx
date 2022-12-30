import BaseContainer from '#/components/BaseContainer';
import { DeviceStatusOptions } from '#/constants/edge';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { ActionType, EditableFormInstance, EditableProTable } from '@ant-design/pro-components';
import React, { FC, useEffect, useRef, useState } from 'react';
import { fetchAlgorithmList } from '#/services/api/config/algorithm';
import styles from './index.module.less';
import { Button } from 'antd';

const AlgorithmConfig: FC = () => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [editStatus, setEditStatus] = useState(false);
  const editorFormRef = useRef<EditableFormInstance<Config.AlgorithmListItem>>();

  const [data, setData] = useState<readonly Config.AlgorithmListItem[]>([]);
  const columns: ProColumns<Config.AlgorithmListItem>[] = [
    {
      title: '算法模块',
      dataIndex: 'module',
      editable: false,
    },
    {
      title: '算法名称',
      dataIndex: 'algo',
      editable: false,
      search: false,
    },
    {
      title: '算法版本',
      dataIndex: 'inUse',
      key: 'inUse',
      valueType: 'select',
      valueEnum: entity => {
        const result = {};
        entity.version?.map(v => {
          result[v.version] = { text: v.version };
        });
        return result;
      },
      editable: true,
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'enable',
      key: 'enable',
      editable: true,
      valueType: 'select',
      valueEnum: statusOptionFormat(DeviceStatusOptions),
      search: false,
      //   @ts-ignore
      renderFormItem: row => <div>{row.valueEnum[editStatus].text}</div>,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      editable: false,
      search: false,
    },
    {
      title: t('Operate'),
      width: 220,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_text, record, _, action) => [
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
            setEditStatus(record.enable);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  const handleConfig = () => {
    console.log('更新数据', data);
  };

  const init = async () => {
    const result = await fetchAlgorithmList();
    setData(result.data);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <BaseContainer>
      <EditableProTable<Config.AlgorithmListItem>
        actionRef={actionRef}
        editableFormRef={editorFormRef}
        columns={columns}
        rowKey="id"
        value={data}
        onChange={setData}
        controlled
        search={{ labelWidth: 0 }}
        editable={{
          type: 'single',
          editableKeys,
          actionRender: (row, config, defaultDoms) => [
            defaultDoms.save,
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              key="set"
              className={editStatus ? styles.disabled : null}
              onClick={() => {
                setEditStatus(!editStatus);
                editorFormRef.current?.setRowData?.(config.index!, {
                  enable: !row.enable,
                });
              }}
            >
              {editStatus ? '禁用' : '启用'}
            </a>,
          ],
          onChange: setEditableRowKeys,
        }}
        recordCreatorProps={false}
        pagination={{ pageSize: 10 }}
        toolBarRender={() => [<Button onClick={handleConfig}>配置</Button>]}
        options={{
          setting: {
            checkable: true,
          },
        }}
      />
    </BaseContainer>
  );
};

export default AlgorithmConfig;
