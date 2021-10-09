import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgrxIndexModule} from './ngrx-index/ngrx-index.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    NgrxIndexModule,
    HttpClientModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already being imported! Import core modules in the "AppModule" only');
    }
  }
}
