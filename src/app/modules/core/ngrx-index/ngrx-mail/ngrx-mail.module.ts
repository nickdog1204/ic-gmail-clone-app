import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as fromReducer from './reducers';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {mailEffectsList} from "./effects";


@NgModule({
  imports: [
    StoreModule.forFeature(
      fromReducer.featureStateKey,
      fromReducer.reducer
    ),
    EffectsModule.forFeature(mailEffectsList)
  ]
})
export class NgrxMailModule {
}
