import React from 'react';

import { Table, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { TCar } from 'stores';

import { PreviewImage } from '../PreviewImage';

const { confirm } = Modal;

export interface TableVehicleProps {
  match: string;
  onDelete: (value: string) => void;
  source: TCar[];
}

export const TableVehicle: React.FC<TableVehicleProps> = ({ match, onDelete, source }) => {
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
      dataIndex: 'imageUrl',
      key: 'image',
      render: (text: string) => (
        <PreviewImage url={text} to={{ pathname: match, search: `?photo=${text}` }} />
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
  return <Table dataSource={source} columns={columns} />;
};
