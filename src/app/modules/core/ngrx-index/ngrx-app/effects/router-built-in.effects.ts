import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromRouterStore from '@ngrx/router-store';
import {tap} from 'rxjs/operators';
import {
  RouterCancelAction, RouterErrorAction,
  RouterNavigatedAction,
  RouterNavigationAction,
  RouterRequestAction
} from '@ngrx/router-store';

@Injectable()
export class RouterBuiltInEffects {
  routerRequest$ = createEffect(() =>
      this.actions$.pipe(
        ofType(fromRouterStore.ROUTER_REQUEST),
        tap((it: RouterRequestAction) => {
          console.log('ROUTER_REQUEST:');
          // console.log(it);
        })
      )
    , {dispatch: false});
  routerNavigation$ = createEffect(() =>
      this.actions$.pipe(
        ofType<RouterNavigationAction>(fromRouterStore.ROUTER_NAVIGATION),
        tap(it => {
          console.log(`ROUTER_NAVIGATION:`);
          // console.log(it);

        })
      )
    , {dispatch: false});
  routerNavigated$ = createEffect(() =>
      this.actions$.pipe(
        ofType<RouterNavigatedAction>(fromRouterStore.ROUTER_NAVIGATED),
        tap(it => {
          console.log(`ROUTER_NAVIGATEDDD`);
          // console.log(it);
        })
      )
    , {dispatch: false});
  routerCancelled$ = createEffect(() =>
      this.actions$.pipe(
        ofType<RouterCancelAction<any>>(fromRouterStore.ROUTER_CANCEL),
        tap(it => {
          console.log(`ROUTER_CANCEL`);
          // console.log(it);
        })
      )
    , {dispatch: false});
  routerError$ = createEffect(() =>
      this.actions$.pipe(
        ofType<RouterErrorAction<any>>(fromRouterStore.ROUTER_ERROR),
        tap(it => {
          console.log(`ROUTER_ERROR`);
          // console.log(it);
        })
      )
    , {dispatch: false});

  constructor(
    private actions$: Actions
  ) {
  }

}
