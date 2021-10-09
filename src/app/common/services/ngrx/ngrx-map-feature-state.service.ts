import {Injectable} from '@angular/core';
import {IAppState} from "../../../modules/core/ngrx-index/ngrx-app/reducers";
import {Store} from "@ngrx/store";
import {actions} from "../../../modules/core/ngrx-index/ngrx-app/actions";
import {selectors} from "../../../modules/core/ngrx-index/ngrx-app/selectors";
import {skipWhile, tap} from "rxjs/operators";

const mailMainActs = actions.mailFeatureStateActions.mailMainActions;
const s = selectors.mailFeatureStateSelectors.mainSelectors;

@Injectable({
  providedIn: 'root'
})
export class NgrxMapFeatureStateService {

  constructor(
    private store: Store<IAppState>
  ) {
  }

  checkIsLoadListOfMailsForTheFirstTimeAndWaitForTheListToLoadObservable() {
    return this.store.select(s.selectIsListOfMailsFirstLoadedFromRemote)
      .pipe(
        tap(isFirstLoaded => {
          if (!isFirstLoaded) {
            this.dispatchLoadListOfMailsForTheFirstTime();
          }
        }),
        skipWhile(it => !it)
      );
  }

  private dispatchLoadListOfMailsForTheFirstTime() {
    this.store.dispatch(mailMainActs.loadListOfMailsForTheFirstTimeSTART());
  }
}
