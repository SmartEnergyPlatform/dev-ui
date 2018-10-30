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

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  form: any = this.fb.group({
    name: ["", Validators.required],
    redirectUris: this.fb.array([]),
    webOrigins: this.fb.array([]),
  });

  constructor(private router: Router, private fb: FormBuilder, private apiService: ApiService) { 
    this.addRedirectUri();
    this.addWebOrigins()
  }

  ngOnInit() {
  }

  addRedirectUri() { 
    this.form.get('redirectUris').push(new FormControl()); 
  }

  addWebOrigins() { 
    this.form.get('webOrigins').push(new FormControl()); 
  }

  submit() {
    if(this.form.valid) {
      this.apiService.post("/clients/clients",this.form.value).then(result => {
        this.router.navigate(["/developer/clients"])
      })
    }
  }

}
