import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

export type ActiveRoute = string;

@Injectable({providedIn: 'root'})
export class ActiveRouteProvider {

  constructor(private readonly location: Location) {
  }

  get activeRoute(): ActiveRoute {
    return this.location.path();
  }

}
