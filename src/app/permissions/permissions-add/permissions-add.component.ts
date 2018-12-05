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
} from '@angular/core';
import {
  UserManagementService
} from '../../services/user-management/user-management.service';
import {
  AuthService
} from '../../services/auth/auth.service';
import {
  LadonService
} from '../../services/ladon/ladon.service';
import {
  Router
} from '@angular/router';
import {
    FormBuilder,
    Validators,
    FormArray, FormControl
} from '@angular/forms';
import { KongService } from '../../services/kong/kong.service';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './permissions-add.component.html',
  styleUrls: ['./permissions-add.component.css']
})
export class PermissionsAddComponent implements OnInit {
  users: any
  roles: any
  uris: any 
  submit_failed: any = false

  userIsAdmin: false;
  resource: string;

  myControl = new FormControl();


  public form = this.fb.group({
  subject: ["", Validators.pattern("\w+")],
  actions: this.fb.array([])
  });

  // options for autocomplete filter
  filteredOptions: Observable<string[]>;

  public btnDisable: boolean;



  constructor(private kongService: KongService,
            private ladonService: LadonService,
            private fb: FormBuilder,
            private authService: AuthService,
            private router: Router,
            private userManagementService: UserManagementService,
            private formBuilder: FormBuilder) {

  this.userIsAdmin = this.authService.userHasRole("admin");


  this.userManagementService.loadUsers().then(users => this.users = users)

  this.userManagementService.loadRoles().then(roles => this.roles = roles)

  this.uris = this.kongService.loadUris()

  this.addAction();

  this.btnDisable = false;
  }

  showAll() {
    this.router.navigate(["/permissions"])
  }

  ngOnInit() {
  }

  addAction() {
    var control = < FormArray > this.form.controls['actions'];
    var addrCtrl = this.fb.group({
      endpoint: ["", Validators.pattern("\w+")],
      get: [""],
      post: [""],
      delete: [""],
      patch: [""],
      put: [""]
    });

    control.push(addrCtrl);

    // autocomplete filter
    this.filteredOptions = this.myControl.valueChanges
        .pipe(
            startWith(''),
            map(value => this._filter(value))
        );
  }


  submit() {
    // Send list of policies to Ladon
    // Each Triple of Subject, Action and Resource become one policy
    var form_value = this.form.value;
    form_value["actions"].forEach(action => {
      var policy = {
        "Subjects": [form_value["subject"]],
        "Actions": [],
        "Resources": ["<^(endpoints:" + this.resource.substring(1) + ").*>"],
        "Effect": "allow",
        "ID": form_value["subject"] + "-" + action["endpoint"]
      }

      if (action["get"]) policy["Actions"].push("GET")
      if (action["post"]) policy["Actions"].push("POST")
      if (action["patch"]) policy["Actions"].push("PATCH")
      if (action["delete"]) policy["Actions"].push("DELETE")
      if (action["put"]) policy["Actions"].push("PUT")

      this.ladonService.postPolicy(policy).then(res => {
        console.log(policy)
        this.submit_failed = res["Error"] != ""
      }, error => {
        this.submit_failed = true
      })
    });
  }
    // autocomplete filter
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.uris.filter(option => option.toLowerCase().includes(filterValue));
    }


    onChange(event) {
      if (event === 'subject') {
          this.btnDisable = false;
      } else {
          this.btnDisable = true;
      }
    }
}
