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

import {AfterViewInit, Component, OnInit, Output, ViewChild} from '@angular/core';
import {forkJoin} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SwaggerService} from '../../../services/swagger/swagger.service';
import { AuthService } from '../../../services/auth/auth.service';
import {ResponsiveService} from '../../services/responsive.service';
import {SidenavService} from '../sidenav/shared/sidenav.service';
import {ActivatedRoute, NavigationEnd, Router, RoutesRecognized} from '@angular/router';
import {SidenavSectionModel} from '../sidenav/shared/sidenav-section.model';
import {filter, map, take} from 'rxjs/operators';
import {MatSidenav} from '@angular/material';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, AfterViewInit{

    @ViewChild('sidenav') sidenav!: MatSidenav;
    @Output() sections: SidenavSectionModel[] = [];
    @Output() openSection: null | string = null;
    @Output() zIndex = -1;


    inputFocused: boolean = false;
    searchQuery: string;
    docsSearchresult: any = [];
    swaggerSearchresult: any = [];
    blockSwagger: boolean = false;
    blockDoc: boolean = false;
    userIsAdmin = false;
    mobileSearchPageIsHidden: boolean = true;
    Act: boolean = true;



    constructor(private httpClient: HttpClient,
                private swaggerService: SwaggerService,
                private authService: AuthService,
                private responsiveService: ResponsiveService,
                private sidenavService: SidenavService,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.userIsAdmin = this.authService.userHasRole("admin");
      this.checkIfDocIsActive();

  }

    ngAfterViewInit() {
    }

    search() {
        if (this.searchQuery == "") {
            this.inputFocused = false;
        } else {
            this.inputFocused = true;
        }

        this.swaggerSearchresult = [];
        this.docsSearchresult = [];
        var query = this.searchQuery;

        if(!this.blockSwagger) {
            this.blockSwagger = true;
            this.loadSwagger().then(swagger => {
                (<any>swagger).forEach(api => {
                    if (this.queryOccursInContent(query, api.info.title) || this.queryOccursInContent(query, api.info.description)) {
                        this.swaggerSearchresult.push({
                            "title": api.info.title,
                            "url": "/api/" + api.info.title,
                            "content": api.info.description
                        })
                    }
                });
                this.blockSwagger = false
            })
        }

        if(!this.blockDoc) {
            this.blockDoc = true;
            this.loadDocs().then(docs => {
                (<any>docs).forEach(doc => {
                    var foundInContent = this.queryOccursInContent(query,doc["title"]);
                    if (foundInContent) {
                        doc["title"] = doc["title"].slice(this.getIndexOfSearchResultInContent(query,doc["title"]));
                        this.docsSearchresult.push(doc)
                    }
                });
                this.blockDoc = false
            })
        }
    }

    loadSwagger() {
        return this.swaggerService.getSwagger()
    }

    loadDocs() {
        return new Promise(resolve => {
            var pages = [
                { assetUrl: "iot", title: "IoT Repository", redirectUrl: "iot"},
                { assetUrl: "security", title: "Security", redirectUrl: "security"},
                { assetUrl: "analytics", title: "Analytics", redirectUrl: "analytics"},
                { assetUrl: "gettingstarted", title: "Getting Started", redirectUrl: "start"},
                { assetUrl: "process", title: "Prozesse", redirectUrl: "process"}
            ];
            var async = [];
            var content = [];

            pages.forEach(page => {
                async.push(this.httpClient.get("/assets/docs/" + page["assetUrl"] + ".md", {responseType: "text"}))

            });
            forkJoin(async).subscribe(results => {
                for (let index = 0; index < results.length; index++) {
                    content.push({
                        "content": pages[index]["title"],
                        "url": "/doc/" + pages[index]["redirectUrl"],
                        "title": pages[index]["title"]
                    });
                }
                resolve(content)
            })
        })
    }

    queryOccursInContent(query, content) {
        var regex = new RegExp(" " + query + "|^" + query);
        var regexMatch = regex.exec(content);
        if(regexMatch) {
            return true
        }
        return false
    }

    getIndexOfSearchResultInContent(query, content) {
        var regex = new RegExp(" " + query + "|^" + query);
        var regexMatch = regex.exec(content);
        if(regexMatch) {
            return regexMatch["index"]
        }
        return false
    }

    removeMarkdownChars(text) {
        return text.replace(/#/g, '')
            .replace(/\!\[.*?\][\[\(].*?[\]\)]/g, '')
            .replace(/```/g, '')
    }

    toggle(sidenavOpen: boolean): void {
        this.sidenavService.toggle(sidenavOpen);
    }

    openSearchResult(url) {
        this.inputFocused = false;
        this.mobileSearchPageIsHidden = true;
        this.router.navigateByUrl(url);
    }

    logout() {
        this.authService.logout()
    }

    private checkIfDocIsActive() {
        this.router.events.subscribe(event => {
            if (event instanceof RoutesRecognized ) {
                const url = event['url'];
                if(url === '/doc'){
                    this.Act = false;
                } else {
                    this.Act = true;
                }
            }
        });
    }
}
