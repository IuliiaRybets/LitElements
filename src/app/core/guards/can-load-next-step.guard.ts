import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Model } from '@core/data-model';
import { AllowedNavigation, CustomRouting, NavigationData } from '@core/service/navigation/navigation.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CanLoadNextStepGuard implements CanActivate {

  constructor(
    //@Inject(NAVIGATION_DATA) private readonly model: Model<NavigationData>,
              private readonly router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (environment.skipGuards) {
      return true;
    }

    const url = route.pathFromRoot
      .map(value => value.url)
      .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
      .reduce((previousValue, currentValue) => `${previousValue}/${currentValue}`, '');

    let prerequisites = AllowedNavigation[url];
   // const alreadyVisisted = this.model.get().visited || [];

    if (!prerequisites) {
      return this.router.createUrlTree([CustomRouting.absolute.tarifierung]);
    }

    if (!Array.isArray(prerequisites)) {
      prerequisites = [prerequisites];
    }

    for (const prerequisite of prerequisites) {
     // if (alreadyVisisted.includes(prerequisite)) {
      //  return true;
     // }
    }

    return this.router.createUrlTree([CustomRouting.absolute.tarifierung]);
  }
}
