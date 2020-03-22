import { Guard } from 'libs/routes';

export type Roles = 'DEV' | 'ADMIN';

export type UserSession = {
  root: Roles;
  auth: boolean;
};

export function onlyFor(roots: Roles[]): Guard<UserSession> {
  return (route, ctx, next) => (ctx && ctx.auth && roots.includes(ctx.root) ? route : next('/d'));
}

export function onlyAuth(): Guard<UserSession> {
  return (route, ctx, next) => (ctx && ctx.auth ? route : next('/'));
}

export function onlyAnon(): Guard<UserSession> {
  return (route, ctx, next) => (ctx && ctx.auth ? next('/d') : route);
}
