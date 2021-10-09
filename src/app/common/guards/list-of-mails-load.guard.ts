import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {NgrxMapFeatureStateService} from '../services/ngrx/ngrx-map-feature-state.service';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListOfMailsLoadGuard implements CanActivate {
  constructor(private ngrxMapFeatureStateService: NgrxMapFeatureStateService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.ngrxMapFeatureStateService
      .checkIsLoadListOfMailsForTheFirstTimeAndWaitForTheListToLoadObservable()
      .pipe(first());
  }

}
