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

import {
  Component,
  OnInit
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';
import {
  DeviceSimService
} from '../../services/devicesim/device-sim.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-edit-actuator',
  templateUrl: './edit-actuator.component.html',
  styleUrls: ['./edit-actuator.component.css']
})
export class EditActuatorComponent implements OnInit {
  form = this.fb.group({
    displayName: ["", Validators.required],
    id: ["", Validators.required],
    parser: ["", Validators.required],
    active: [true],
    states: this.fb.array([]),
  });
  sub: any;
  device: any;
  formIsValid: boolean = false;

  constructor(private fb: FormBuilder, private devicesimService: DeviceSimService, private router: Router, private route: ActivatedRoute) {
    this.form.statusChanges.subscribe(status => {
      this.formIsValid = status == "VALID"
    })

  }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
          this.devicesimService.getDevice(params['id'], params['type']).then(device => {
            this.device = device;
            this.form.get("displayName").setValue(device.displayName);
            this.form.get("id").setValue(device.id);
            this.form.get("parser").setValue(device.parser);
            this.form.get("active").setValue(device.active)
          })
        })
  }

  addState() {
    var states = < FormArray > this.form.get('states');
    states.push(this.fb.group({
      adopt: [false],
      regex: [""],
      response: [""]
    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  update() {
    if (this.form.valid) {
      this.devicesimService.updateActuator(this.form.value).then(result => {
        this.router.navigate(['/devicesim'])
      }).catch(error => {
        console.log(error)
      })
    }
  }
}