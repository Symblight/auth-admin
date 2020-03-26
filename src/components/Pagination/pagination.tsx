import React from 'react';

import { Pagination as PaginationAntd } from 'antd';
import { Link } from 'react-router-dom';
import { TPagination } from 'features/common';

export interface PaginationProps {
  pagination: TPagination | null;
  url: string;
}

export const Pagination: React.FC<PaginationProps> = ({ url, pagination }) => {
  function itemRender(current: number, type: string, originalElement: React.ReactNode) {
    if (pagination === null) return null;
    if (type === 'prev') {
      return <Link to={`${url}?page=${pagination.perPage}`}>{'<'}</Link>;
    }
    if (type === 'next') {
      return <Link to={`${url}?page=${pagination.page + current}`}>{'>'}</Link>;
    }
    if (type === 'page') {
      return <Link to={`${url}?page=${current}`}>{current}</Link>;
    }
    return originalElement;
  }
  if (pagination === null || pagination.total === undefined) return null;

  return (
    <PaginationAntd
      defaultCurrent={pagination.page}
      itemRender={itemRender}
      total={Number(pagination.total)}
      defaultPageSize={5}
    />
  );
};
