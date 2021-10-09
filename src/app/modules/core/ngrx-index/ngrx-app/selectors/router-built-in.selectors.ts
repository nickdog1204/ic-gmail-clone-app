import {createFeatureSelector} from "@ngrx/store";
import {IAppState} from "../reducers";
import * as fromRouterStore from "@ngrx/router-store";


const selectRouterBuiltInState = createFeatureSelector<IAppState,
  fromRouterStore.RouterReducerState<any>>('router');


export const {
  selectRouteParam,
  selectUrl,
  selectRouteParams,
  selectRouteData,
  selectQueryParams,
  selectQueryParam,
  selectFragment,
  selectCurrentRoute
} = fromRouterStore.getSelectors(selectRouterBuiltInState);
