import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IMailFeatureState} from "../reducers";
import * as fromReducers from '../reducers';


const selectMailFeatureState =
  createFeatureSelector<fromReducers.IMailFeatureState>(fromReducers.featureStateKey);


export const selectListOfAllMails = createSelector(
  selectMailFeatureState,
  fromReducers.localSelectors.selectListOfAllMails
);
export const selectListOfMailIds = createSelector(
  selectMailFeatureState,
  fromReducers.localSelectors.selectListOfMailIds
);
export const selectNumOfMails = createSelector(
  selectMailFeatureState,
  fromReducers.localSelectors.selectNumOfMails
);
export const selectMapFromMailIdToMail = createSelector(
  selectMailFeatureState,
  fromReducers.localSelectors.selectMapFromMailIdToMail
);
export const selectIsListOfMailsFirstLoadedFromRemote = createSelector(
  selectMailFeatureState,
  fromReducers.localSelectors.selectIsListOfMailsFirstLoadedFromRemote
);


