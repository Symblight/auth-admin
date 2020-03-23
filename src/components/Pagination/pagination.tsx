import React from 'react';

import { Pagination as PaginationAntd } from 'antd';
import { Link } from 'react-router-dom';
import { TPagination } from 'stores';

export interface PaginationProps {
  pagination: TPagination | null;
}

export const Pagination: React.FC<PaginationProps> = ({ pagination }) => {
  function itemRender(current: number, type: string, originalElement: React.ReactNode) {
    if (type === 'prev') {
      return <Link to={`/d/?page=${pagination.perPage}`}>{'<'}</Link>;
    }
    if (type === 'next') {
      return <Link to={`/d/?page=${pagination.page + current}`}>{'>'}</Link>;
    }
    if (type === 'page') {
      return <Link to={`/d/?page=${current}`}>{current}</Link>;
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
