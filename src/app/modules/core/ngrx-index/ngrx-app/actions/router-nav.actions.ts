import {createAction, props} from '@ngrx/store';
import {UrlTree} from '@angular/router';
import {AnimationOptions, NavigationOptions} from '@ionic/angular/providers/nav-controller';


export const ionNavForward = createAction(
  '[Router Nav] Ion NavForward',
  props<{ url: 'string' | UrlTree | any[]; navigationOptions?: NavigationOptions }>()
);
export const ionNavBack = createAction(
  '[Router Nav] Ion NavBack',
  props<{ url: 'string' | UrlTree | any[]; navigationOptions?: NavigationOptions }>()
);
export const ionNavAsRoot = createAction(
  '[Router Nav] Ion NavAsRoot',
  props<{ url: 'string' | UrlTree | any[]; navigationOptions?: NavigationOptions }>()
);
export const ionBack = createAction(
  '[Router Nav] Ion back',
  props<{ animationOptions?: AnimationOptions }>()
);
export const locForward = createAction(
  '[Router Nav] Loc Back'
);
export const locBack = createAction(
  '[Router Nav] Loc Forward'
);
