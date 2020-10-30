import {
  AngularFireAuthGuard,
  customClaims,
  hasCustomClaim,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard'
import { ActivatedRouteSnapshot } from '@angular/router'
import { pipe } from 'rxjs'
import { map } from 'rxjs/operators'

export class FireAuthGuard {
  /**
   * @example { path: 'route', component: YourCmp, canActivate: [FireAuthGuard.isAuth] }
   * @static
   */
  static isAuth = AngularFireAuthGuard

  /**
   * @example { path: 'route', component: YourCmp, canActivate: [FireAuthGuard.isAuth], data: { authGuardPipe: FireAuthGuard.allowOnly('admin') }}
   * @static
   */
  // static allowOnly = (role: string) => () => hasCustomClaim(role)

  /**
   * @example { path: 'route', component: YourCmp, canActivate: [FireAuthGuard.isAuth], data: { authGuardPipe: FireAuthGuard.redirectTo(['login']) }}
   * @static
   */
  static redirectTo = (path: string[]) => () => redirectUnauthorizedTo(path)

  /**
   * @example { path: 'adm/:id', component: YourCmp, canActivate: [FireAuthGuard.isAuth], data: { authGuardPipe: FireAuthGuard.belongsTo('profile') }}
   * @static
   */
  // static belongsTo = (prefix: string) => () => (next: ActivatedRouteSnapshot) =>
  //   hasCustomClaim(`${prefix}-${next.params.id}`)

  /**
   * @example { path: 'route', component: YourCmp, ...canActivate(FireAuthGuard.allowRoles(['admin','editor'])) }}
   * @static
   */
  // static allowRoles = (roles: string[]) => () =>
  //   pipe(
  //     customClaims,
  //     map((claims) => roles.some((role) => claims.roles.includes(role)))
  //   )
}
