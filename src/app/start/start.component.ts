/*
 *
 *     Copyright 2018 InfAI (CC SES)
 *
 *     Licensed under the Apache License, Version 2.0 (the “License”);
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an “AS IS” BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 *
 */

import {
  Component,
  OnInit
} from '@angular/core'
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
  export class StartComponent implements OnInit {
  userIsAdmin: boolean = false;
  userIsDev: boolean = false;
  
  constructor(private authService: AuthService) {
    this.userIsDev = this.authService.userHasRole("developer");
    this.userIsAdmin = this.authService.userHasRole("admin")
  }

  ngOnInit() {}

}