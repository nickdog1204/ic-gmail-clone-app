import * as fromRouterStore from "@ngrx/router-store";
import {ActionReducerMap} from "@ngrx/store";


export interface IAppState {
  router: fromRouterStore.RouterReducerState<any>;
}

export const appActionReducerMap: ActionReducerMap<IAppState> = {
  router: fromRouterStore.routerReducer
};
