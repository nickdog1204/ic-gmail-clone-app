import {createAction, props} from '@ngrx/store';
import {IMail} from '../reducers';


export const loadListOfMailsForTheFirstTimeSTART = createAction(
  '[Map Main Actions] Load list of mails for the first time START'
);
export const loadListOfMailsForTheFirstTimeSUCCESS = createAction(
  '[Map Main Actions] Load list of mails for the first time SUCCESS',
  props<{ listOfMails: IMail[] }>()
);
export const loadListOfMailsForTheFirstTimeERROR = createAction(
  '[Map Main Actions] Load list of mails for the first time ERROR',
  props<{ error: any }>()
);
