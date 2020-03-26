import React from 'react';

import { Table, Modal } from 'antd';
import _ from 'lodash';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { TCategory } from 'features/vehicles';
import { TPagination } from 'features/common';
import { Pagination } from 'components';

const { confirm } = Modal;

export interface TableCategoryProps {
  match: string;
  onDelete: (value: string) => void;
  onEdit: (value: TCategory) => void;
  onShow?: (value: string) => void;
  source: TCategory[];
  pagination: TPagination | null;
  loading: boolean;
  search: string;
}

export const TableCategories: React.FC<TableCategoryProps> = ({
  onDelete,
  source = [],
  pagination,
  loading,
  onEdit,
}) => {
  function deleteCar(id: string) {
    onDelete(id);
  }

  function showDeleteConfirm(value: string) {
    confirm({
      title: 'Вы уверены что хотите удалить категорию?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        deleteCar(value);
      },
    });
  }

  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '',
      dataIndex: '',
      key: 'edit',
      render: (text: string, record: TCategory) => (
        <div onClick={() => onEdit(record)}>Редактировать</div>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: 'remove',
      render: (text: string, record: TCategory) => (
        <span onClick={() => record.id && showDeleteConfirm(record.id)}>Удалить</span>
      ),
    },
  ];
  return (
    <>
      <Table
        dataSource={source.length === 0 ? [] : source}
        columns={columns}
        pagination={false}
        loading={loading}
        rowKey={() => _.uniqueId('row-')}
      />
      <Pagination url="/d/c/" pagination={pagination} />
    </>
  );
};
