import * as routerBuiltinSelectors from './router-built-in.selectors';
import {mailFeatureStateSelectors} from '../../ngrx-mail/selectors';


export const appStateSelectors = {
  routerBuiltinSelectors
};

export const selectors = {
  appStateSelectors,
  mailFeatureStateSelectors
};
