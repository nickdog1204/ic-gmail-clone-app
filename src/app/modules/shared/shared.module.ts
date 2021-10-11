import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {HideHeaderDirective} from "./directives/hide-header.directive";
import {ReactiveComponentModule} from "@ngrx/component";
import {AccountComponent} from "./components/account/account.component";

const SHARED_MODULE_LIST = [
  CommonModule,
  IonicModule,
  ReactiveFormsModule,
  ReactiveComponentModule
];

const SHARED_DIRECTIVE_LIST = [
  HideHeaderDirective
];

const SHARED_COMPONENT_LIST = [
  AccountComponent
];



@NgModule({
  declarations: [
    ...SHARED_DIRECTIVE_LIST,
    ...SHARED_COMPONENT_LIST
  ],
  imports: [
    ...SHARED_MODULE_LIST
  ],
  exports: [
    ...SHARED_MODULE_LIST,
    ...SHARED_DIRECTIVE_LIST,
    ...SHARED_COMPONENT_LIST
  ]
})
export class SharedModule { }
