import {NgModule} from '@angular/core';
import {AuthModule} from "@angular/fire/auth";

// @NgModule({
//   imports: [AuthModule.forRoot({
//     config: {
//       authority: 'localhost',
//       redirectUrl: window.location.origin,
//       postLogoutRedirectUri: window.location.origin,
//       clientId: 'please-enter-clientId',
//       scope: 'please-enter-scopes', // 'openid profile ' + your scopes
//       responseType: 'code',
//       silentRenew: true,
//       silentRenewUrl: window.location.origin + '/silent-renew.html',
//       renewTimeBeforeTokenExpiresInSeconds: 10,
//     }
//   })],
//   exports: [AuthModule],
// })
export class AuthConfigModule {
}
