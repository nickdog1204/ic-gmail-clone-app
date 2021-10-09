import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgrxAppModule} from "./ngrx-app/ngrx-app.module";
import {NgrxMailModule} from "./ngrx-mail/ngrx-mail.module";



@NgModule({
  imports: [
    NgrxAppModule,
    NgrxMailModule
  ]
})
export class NgrxIndexModule { }
