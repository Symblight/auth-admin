import React from 'react';
import { Skeleton, Button, Descriptions, Card } from 'antd';

import {
  RouteComponentProps,
  RouteProps,
  Link,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import { Breadcrumb, PreviewImage } from 'components';
import { TCar } from 'stores';

import { Wrapper, Photos, Header, Image } from './styled';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
  data: TCar | null;
  loading: boolean;
}

export const Page: React.FC<PageProps> = ({ data, loading }) => {
  const match = useRouteMatch<{ id: string }>();
  const location = useLocation();

  function renderImages(images: string[]) {
    if (Array.isArray(images)) {
      return images.map((item: string) => (
        <PreviewImage
          key={item}
          url={{ path: match.url, search: `${location.search}&photo=${item}` }}
        />
      ));
    } else {
      return null;
    }
  }

  if (loading)
    return (
      <Card>
        <Skeleton active />
      </Card>
    );

  if (data === null) return null;

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/d">Автомобили</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.id}</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Wrapper>
          <Header>
            <Link to={`/d/v/${match.params.id}/edit`}>
              <Button type="primary">Редактировать</Button>
            </Link>
            <Button type="danger">Удалить</Button>
          </Header>
          <Image src={data.image_url} alt="car" />
          <Photos>{data.images_url && renderImages(data.images_url)}</Photos>
          <Descriptions title="Автомобиль">
            <Descriptions.Item label="Название">{data.title}</Descriptions.Item>
            <Descriptions.Item label="Цвет">{data.color}</Descriptions.Item>
            <Descriptions.Item label="Стоимость">{data.price}</Descriptions.Item>
            <Descriptions.Item label="Пасcажиры">{data.passenger}</Descriptions.Item>
            <Descriptions.Item label="Объем двигателя">{data.engine}</Descriptions.Item>
            <Descriptions.Item label="Расход топлива">{data.fuel}</Descriptions.Item>
            <Descriptions.Item label="Багаж">{data.bags}</Descriptions.Item>
            <Descriptions.Item label="Год выпуска">{data.year}</Descriptions.Item>
          </Descriptions>
        </Wrapper>
      </Card>
    </>
  );
};
