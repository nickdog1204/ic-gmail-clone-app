import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {createReducer, on} from "@ngrx/store";
import {actions} from "../../ngrx-app/actions";

export interface IMail {
  from: string;
  read: boolean;
  content: string;
  date: string;
  star: boolean;
  id: string;
}

export const featureStateKey = 'mail';

export interface IMailFeatureState extends EntityState<IMail> {
  isListOfMailsFirstLoadedFromRemote: boolean;
}

const adapter = createEntityAdapter<IMail>();

const initialState: IMailFeatureState = adapter.getInitialState({
  isListOfMailsFirstLoadedFromRemote: false
});

const acts = actions.mailFeatureStateActions.mailMainActions

export const reducer = createReducer<IMailFeatureState>(
  initialState,
  on(acts.loadListOfMailsForTheFirstTimeSUCCESS, (state, {listOfMails}) =>
    adapter.setAll(listOfMails, {
      ...state,
      isListOfMailsFirstLoadedFromRemote: true
    })
  )
);

const {
  selectTotal,
  selectIds,
  selectEntities,
  selectAll
} = adapter.getSelectors();

export const localSelectors = {
  selectNumOfMails: selectTotal,
  selectListOfMailIds: selectIds,
  selectMapFromMailIdToMail: selectEntities,
  selectListOfAllMails: selectAll,
  selectIsListOfMailsFirstLoadedFromRemote:
    (state: IMailFeatureState) => state.isListOfMailsFirstLoadedFromRemote
};
