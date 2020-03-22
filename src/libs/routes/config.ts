import { RouteComponentProps } from 'react-router-dom';

import { redirectTo } from './routes';

export type ExternalRouteProps<Ctx = any> = {
  path?: string;
  routes?: Route<Ctx>[];
  name?: string;
  component: React.ComponentType<RouteComponentProps> | React.ComponentType<any>;
  guards?: Guard<Ctx>[];
};

export type SimpleRoute<Context> = {
  name?: string;
  path?: string;
  exact?: boolean;
  component: React.ComponentType<RouteComponentProps> | React.ComponentType<any>;
  guards?: Guard<Context>[];
};

export type Route<Context> = SimpleRoute<Context> | ExternalRouteProps<Context>;
export interface CustomProps {
  component?: unknown;
  props: unknown;
}

export type Guard<Ctx> = (
  route: ExternalRouteProps<Ctx>,
  context: Ctx,
  next: (to: string) => void,
) => ExternalRouteProps<Ctx> | null | void;

function next(to: string) {
  return to;
}

function compileRoute<C>(route: Route<C>, context: C): Route<C> | null {
  const { guards } = route;
  let compileRoutes: Route<C> | null = { ...route };
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

export function protectedRoutes<C>(routes: Route<C>[], context: C) {
  return routes.map(route => compileRoute(route, context)).filter(Boolean);
}
