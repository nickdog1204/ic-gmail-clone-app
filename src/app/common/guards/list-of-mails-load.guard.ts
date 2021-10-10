import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {NgrxMailFeatureStateService} from '../services/ngrx/ngrx-mail-feature-state.service';
import {first, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListOfMailsLoadGuard implements CanActivate {
  constructor(private ngrxMailFeatureStateService: NgrxMailFeatureStateService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.ngrxMailFeatureStateService
      .checkIsLoadListOfMailsForTheFirstTimeAndWaitForTheListToLoadObservable()
      .pipe(first(), tap(it => console.log(`router guard it: ${it}`)));
  }

}
