import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MailService} from '../../../../../common/services/mail.service';
import {actions} from '../../ngrx-app/actions';
import {catchError, exhaustMap, first, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LoadingIndicatorService} from '../../../../../common/services/loading-indicator.service';
import {IMail, IMailResponse} from '../../../../../common/models/mail';
import {utils} from '../../../../../common/utils';

const mailMainActs = actions.mailFeatureStateActions.mailMainActions;

@Injectable()
export class MailMainEffects {
  $loadListOfMailsForTheFirstTimeSTART$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mailMainActs.loadListOfMailsForTheFirstTimeSTART),
      exhaustMap(async () => {
          try {
            await this.loadingIndicatorService.presentLoadingListOfMailsLoadingIndicator();
            const res: IMailResponse[] = await this.mailService.getListOfMailsObservable().pipe(first()).toPromise();
            this.loadingIndicatorService.dismissLoadingAsync();
            const listOfMails: IMail[] = res.map(mailRes => {
              const mail: IMail = {
                ...mailRes,
                color: utils.colorUtils.intToRGB(utils.colorUtils.hashCode(mailRes.from))
              };
              return mail;
            });

            return mailMainActs.loadListOfMailsForTheFirstTimeSUCCESS({listOfMails});
          } catch (error) {
            this.loadingIndicatorService.dismissLoadingAsync();
            return mailMainActs.loadListOfMailsForTheFirstTimeERROR({error});
          }
        }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private mailService: MailService,
    private loadingIndicatorService: LoadingIndicatorService
  ) {
  }


}
