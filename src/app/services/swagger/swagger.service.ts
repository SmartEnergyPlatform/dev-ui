/*
 *  /*
 *  *    Copyright 2018 InfAI (CC SES)
 *  *
 *  *    Licensed under the Apache License, Version 2.0 (the “License”);
 *  *    you may not use this file except in compliance with the License.
 *  *    You may obtain a copy of the License at
 *  *
 *  *        http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *    Unless required by applicable law or agreed to in writing, software
 *  *    distributed under the License is distributed on an “AS IS” BASIS,
 *  *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  *    See the License for the specific language governing permissions and
 *  *    limitations under the License.
 *
 */

import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  AuthService
} from '../auth/auth.service';
import { ApiService } from '../api/api.service';

@Injectable()
export class SwaggerService {
  constructor(private apiService: ApiService,private authService: AuthService) {}

  getSwagger() {
    /*
      Get all Swagger files from the service.
      giIterate through the array and retrieve necessary information(name, version) and add it to the list using currently unavailable descriptions.
    */
    return new Promise(resolve => {
        this.authService.getToken().then(token => {
          this.apiService.get('/swagger')
            .then(res => {
                resolve(res);
              },
              err => {
                console.log("Error occured");
              }
            );
        })
    })
  }
}