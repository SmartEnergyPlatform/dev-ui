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
  Component
} from '@angular/core';
import {
  DatePipe
} from '@angular/common'
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  Router
} from '@angular/router';
import {
  MatTableDataSource
} from '@angular/material';
import {
  LadonService
} from '../../services/ladon/ladon.service';
import {
  AuthService
} from '../../services/auth/auth.service';
import {element} from 'protractor';

@Component({
  selector: 'list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.css']
})
export class PermissionsListComponent {
  displayedColumns = ['subject', 'actions', 'resource', 'delete', 'edit'];
  policies: any

  constructor(private authService: AuthService, private ladonService: LadonService, private router: Router) {
    this.loadPolicies()
  }


  loadPolicies() {
    this.ladonService.getAllPolicies().then(response => {
      this.policies = (<any>response).map(policy => {
        policy["subject"] = policy["subjects"][0]
        if (policy["resources"][0] == "<.*>") {
          policy["resource"] = policy["resources"][0]
        } else {
          policy["resource"] = policy["resources"][0].split("(")[1].split(")")[0].replace(/:/g, "/").replace("endpoints", "")
        }
        policy["actions"] = policy["actions"].toString()
        return policy
      })

      this.policies = new MatTableDataSource(this.policies)
    })
  }

  createPolicy() {
    this.router.navigate(["/permissions/add"])
  }

  editPolicy(policy) {
      this.router.navigate(["/permissions/edit", {id: policy['id'], actions: policy['actions'], subject: policy['subject'], resource: policy['resource']}]
      );
  }

  deletePolicy(policy) {
    console.log("delete policy " + policy["id"])
    this.ladonService.deletePolicy(policy).then(response => {
      console.log(response)
      this.loadPolicies()
    })
  }

}
