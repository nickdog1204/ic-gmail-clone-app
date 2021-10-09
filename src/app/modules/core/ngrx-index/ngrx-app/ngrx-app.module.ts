import {NgModule} from '@angular/core';
import {StoreModule} from "@ngrx/store";
import * as fromReducers from './reducers';
import {NavigationActionTiming, RouterState, StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../../../../../environments/environment";
import {EffectsModule} from "@ngrx/effects";
import {appEffectsList} from "./effects";


@NgModule({
  imports: [
    StoreModule.forRoot(
      fromReducers.appActionReducerMap,
    ),
    EffectsModule.forRoot(appEffectsList),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
      navigationActionTiming: NavigationActionTiming.PreActivation
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ]
})
export class NgrxAppModule {
}
