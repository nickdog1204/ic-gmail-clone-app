import {Injectable} from '@angular/core';
import {IAppState} from "../../../modules/core/ngrx-index/ngrx-app/reducers";
import {Store} from "@ngrx/store";
import {actions} from "../../../modules/core/ngrx-index/ngrx-app/actions";
import {selectors} from "../../../modules/core/ngrx-index/ngrx-app/selectors";
import {catchError, skipWhile, switchMap, tap} from "rxjs/operators";
import {IMail} from "../../models/mail";
import {EMPTY, Observable, of, throwError} from "rxjs";

const mailMainActs = actions.mailFeatureStateActions.mailMainActions;
const s = selectors.mailFeatureStateSelectors.mainSelectors;

@Injectable({
  providedIn: 'root'
})
export class NgrxMailFeatureStateService {

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


  getListOfAllMailsAfterConfirmingListOfMailsFirstLoadedObservable(): Observable<IMail[]> {
    return this.checkIsLoadListOfMailsForTheFirstTimeAndWaitForTheListToLoadObservable()
      .pipe(
        switchMap(isFirstLoaded => {
          if (!isFirstLoaded) {
            throw new Error('ERRORRRR: The list is not in the global store');
          }
          return this.getListOfAllMailsObservable();
        }),
        catchError(error => {
          console.log('Pipeline throws an exception: ', error);
          return of([]);
        })
      );

  }

  private getListOfAllMailsObservable() {
    return this.store.select(s.selectListOfAllMails);
  }

  private dispatchLoadListOfMailsForTheFirstTime() {
    this.store.dispatch(mailMainActs.loadListOfMailsForTheFirstTimeSTART());
  }
}
