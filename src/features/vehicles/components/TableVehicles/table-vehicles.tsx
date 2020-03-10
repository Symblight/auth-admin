import React from 'react';

import { Table, Modal } from 'antd';
import _ from 'lodash';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { TCar, TPagination, TCategory } from 'stores';
import { Pagination, PreviewImage } from 'components';

const { confirm } = Modal;

export interface TableVehicleProps {
  match: string;
  onDelete: (value: string) => void;
  source: TCar[];
  pagination: TPagination;
  loading: boolean;
  search: string;
}

export const TableVehicle: React.FC<TableVehicleProps> = ({
  match,
  onDelete,
  source = [],
  pagination,
  loading,
  search,
}) => {
  function deleteCar(id: string) {
    onDelete(id);
  }

  function showDeleteConfirm(value: string) {
    confirm({
      title: 'Вы уверены что хотите удалить машину?',
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
      render: (text: string, record: TCar) => <Link to={`${match}/v/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Фото',
      dataIndex: 'image_url',
      key: 'image',
      render: (text: string) => (
        <PreviewImage url={{ path: match, search: `${search}&photo=${text}` }} />
      ),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '',
      dataIndex: '',
      key: 'edit',
      render: (text: string, record: TCar) => (
        <Link to={`${match}/v/${record.id}/edit`}>Редактировать</Link>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: 'remove',
      render: (text: string, record: TCar) => (
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
      <Pagination pagination={pagination} />
    </>
  );
};
