/*
 *  Copyright  2018 InfAI (CC SES)
 *
 * Licensed under the Apache License, Version 2.0 (the “License”); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an “AS IS” BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 *
 *
 */

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { environment } from '../../../environments/environment';

declare var Keycloak: any;
declare var KEYCLOAK_URL: any;
declare var CLIENT_ID: any;

@Injectable()
export class AuthService {
  static auth: any = {};

  constructor(private httpClient: HttpClient) {}

  static init(): Promise<any> {
    if (!environment.loginRequired) {
      AuthService.auth.loggedIn = true;
      return new Promise(resolve => {
        resolve()
      })
    }

    let keycloakConfig = {
      realm: 'master',
      redirectUri: window.location.href
    };

    if (!environment.production) {
      keycloakConfig["url"] = environment["keycloak"];
      keycloakConfig["clientId"] =  environment["client"]
    } else {
      keycloakConfig["url"] = KEYCLOAK_URL + "/auth";
      keycloakConfig["clientId"] =  CLIENT_ID
    }

    let keycloakAuth: any = new Keycloak(keycloakConfig);
    AuthService.auth.loggedIn = false;

      return new Promise((resolve, reject) => {
        keycloakAuth.init({ onLoad: 'login-required' })
          .success(() => {
            AuthService.auth.loggedIn = true;
            AuthService.auth.authz = keycloakAuth;
            AuthService.auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/master/protocol/openid-connect/logout?redirect_uri=" + window.location.href;
            keycloakAuth.loadUserProfile().success(userInfo => sessionStorage.setItem('id_token', JSON.stringify(userInfo)));
            resolve();
          })
          .error(() => {
            reject();
          });
      });
    }

  userHasRole(role) {
    if (!environment.loginRequired) {
      return true
    }
    return AuthService.auth.authz.hasRealmRole(role)
  }

  getUserProfile() {
    var id_token = sessionStorage.getItem("id_token");
    return JSON.parse(id_token)
  }

  logout() {
    console.log('*** LOGOUT');
    AuthService.auth.loggedIn = false;
    AuthService.auth.authz = null;

    window.location.href = AuthService.auth.logoutUrl;
  }

  userIsAuthenticated() {
    return AuthService.auth.loggedIn
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (AuthService.auth.authz.token) {
        AuthService.auth.authz.updateToken(5)
          .success(() => {
            resolve(<string>AuthService.auth.authz.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      }
    });
  }

  get(path) {
    return new Promise(resolve => {
      this.getToken().then(token => {
        var headers = new HttpHeaders({
          "Authorization": "Bearer " + token
        });
    
        this.httpClient.get(KEYCLOAK_URL + "/auth" + path, {'headers': headers}).subscribe(result => resolve(result))
      })
    })
  }
}