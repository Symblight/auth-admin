import { RouteProps, RouteComponentProps } from 'react-router-dom';

import { redirectTo } from './routes';

export interface CustomRouteProps<Ctx> extends RouteProps {
  routes?: RouteProps[];
  guards?: Guard<Ctx>[];
  name?: string;
  Component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export interface CustomProps {
  component?: any;
  props: any;
}

export type Guard<Ctx> = (
  route: CustomRouteProps<Ctx>,
  context: Ctx,
  next: (to: string) => void,
) => CustomRouteProps<Ctx> | null | void;

function next(to: string) {
  return to;
}

function compileRoute<C>(route: CustomRouteProps<C>, context: C): CustomRouteProps<C> | null {
  const { guards } = route;
  let compileRoutes: CustomRouteProps<C> | null = { ...route };
  if (guards) {
    guards.map(guard => {
      const res = guard(route, context, next);

      if (compileRoutes !== null && typeof res === 'string') {
        compileRoutes.component = redirectTo.bind(null, { to: res });
      } else if (typeof res === 'object') {
        compileRoutes = res;
      }
    });
  }
  return compileRoutes;
}

export function protectedRoutes<C>(routes: CustomRouteProps<C>[], context: C) {
  return routes.map(route => compileRoute(route, context)).filter(Boolean);
}
