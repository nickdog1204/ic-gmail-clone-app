import {IMail} from "../../../common/models/mail";
import {Injectable} from "@angular/core";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {NgrxMailFeatureStateService} from "../../../common/services/ngrx/ngrx-mail-feature-state.service";
import {delay, exhaustMap, first, skip, startWith, switchMap, tap} from "rxjs/operators";
import {Observable} from "rxjs";


export interface IMailPageState {
  listOfMails: IMail[];
}

export interface IMailPageViewModel extends IMailPageState {

}


@Injectable()
export class MailPageStore extends ComponentStore<IMailPageState> {

  waitAndGetFromGlobalStoreListOfMailsAndInitializeStore = this.effect(trigger$ =>
    trigger$.pipe(
      switchMap(it =>
        this.ngrxMailFeatureStateService.getListOfAllMailsAfterConfirmingListOfMailsFirstLoadedObservable()
          .pipe(
            tapResponse(
              listOfMails => {
                console.log('listOfMails in effects:', listOfMails);
                this.setState({listOfMails});
              },
              error => console.log('effectss error')
            )
          )
      )
    )
  );

  private updateWithListOfMails = this.updater<IMail[]>((state, listOfMails) =>
    ({
      ...state,
      listOfMails
    })
  );

  private listOfMails$ = this.select(state => state.listOfMails);
  private vm$: Observable<IMailPageViewModel> = this.select(
    this.listOfMails$,
    (listOfMails) => ({
      listOfMails,
    })
  );

  constructor(private ngrxMailFeatureStateService: NgrxMailFeatureStateService) {
    super();
    console.log('mail page store constructor');
  }


  getViewModelObservable(): Observable<IMailPageViewModel> {
    return this.ngrxMailFeatureStateService.getListOfAllMailsAfterConfirmingListOfMailsFirstLoadedObservable()
      .pipe(
        first(),
        tap(listOfMails => {
          console.log('setState listofMails', listOfMails);
          this.setState({listOfMails});
        }),
        switchMap(listOfMails => this.vm$
          .pipe(
            skip(1),
            startWith({listOfMails})
          ))
      );
  }


}
