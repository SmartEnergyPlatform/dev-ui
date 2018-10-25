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

import {NgModule, Optional, SkipSelf} from '@angular/core';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {HttpLoaderFactory} from '../app.module';
import {CommonModule} from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    imports: [

        CommonModule,
        RouterModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
                }
            }),



    ],
    declarations: [

        SidenavComponent,

        ToolbarComponent,


    ],
    exports: [

        SidenavComponent,

        ToolbarComponent,

    ],

})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}