import React, { useState, useEffect } from 'react';
import { useStore } from 'effector-react';

import { RouteComponentProps, useLocation, useRouteMatch } from 'react-router-dom';
import { Drawer, Button } from 'antd';

import { PageHeader } from 'components';
import { TableCategories, CategoryForm } from 'features/common';
import { TCategory } from 'features/vehicles';
import { useParams } from 'libs/useParams';

import {
  $categoriesWithPagination,
  pageMounted,
  getCategories,
  createCategories,
  editCategories,
  removeCategories,
} from './model';

export type PageProps = RouteComponentProps;

type StateDrawer = {
  title: string;
  visible: boolean;
  type: 'none' | 'edit' | 'create' | 'view';
  data?: TCategory;
};

export const CategoriesPage: React.FC<PageProps> = () => {
  const loading = useStore(getCategories.pending);
  const { categories, pagination } = useStore($categoriesWithPagination);
  const [stateDrawer, setStateDrawer] = useState<StateDrawer>({
    title: '',
    visible: false,
    type: 'none',
    data: {} as TCategory,
  });
  const location = useLocation();
  const { parse } = useParams();
  const match = useRouteMatch();
  const page = parse('page');

  useEffect(() => {
    pageMounted(page);
  }, [page]);

  const showDrawer = () => {
    setStateDrawer({
      title: 'Добавить категорию',
      visible: true,
      type: 'create',
    });
  };

  const onClose = () => {
    setStateDrawer({
      title: '',
      visible: false,
      type: 'none',
      data: undefined,
    });
  };

  const handleEdit = (data: TCategory) => {
    setStateDrawer({
      title: 'Редактировать категорию',
      visible: true,
      type: 'edit',
      data,
    });
  };

  function handleDelete(id: string) {
    removeCategories(id);
  }

  function handleSubmitCreate(values: TCategory) {
    createCategories(values);
    onClose();
  }

  function handleSubmitEdit(values: TCategory) {
    editCategories(values);
    onClose();
  }

  return (
    <>
      <PageHeader title="Категории" onClick={showDrawer} buttonText="Добавить категорию" />
      <TableCategories
        match={match.path}
        search={location.search}
        source={categories}
        pagination={pagination}
        onDelete={handleDelete}
        onEdit={handleEdit}
        loading={loading}
      />
      <Drawer
        title={stateDrawer.title}
        placement="right"
        closable
        width={420}
        onClose={onClose}
        visible={stateDrawer.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Отменить
            </Button>
          </div>
        }
      >
        {stateDrawer.type === 'edit' && stateDrawer.data ? (
          <CategoryForm
            textButton="Редактировать"
            onSubmit={handleSubmitEdit}
            data={stateDrawer.data}
          />
        ) : (
          <CategoryForm textButton="Создать" onSubmit={handleSubmitCreate} />
        )}
      </Drawer>
    </>
  );
};
