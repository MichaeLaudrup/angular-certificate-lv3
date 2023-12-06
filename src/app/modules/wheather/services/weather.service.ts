import {Injectable, OnDestroy, Signal, signal} from '@angular/core';
import {Observable, of, timer } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { CurrentConditions } from '../pages/current-conditions/current-conditions.type';
import { ConditionsAndZip } from '../models/conditions-and-zip.type';
import { Forecast } from '../pages/forecasts-list/forecast.type';
import { LocationService } from './location.service';
import { environment } from 'environments/environment';
import { SubSink } from 'subsink';
import { take, tap } from 'rxjs/operators';
import { CacheService } from 'app/core/services/cache.service';
import { NotificationService } from 'app/core/services/notification.service';

@Injectable()
export class WeatherService implements OnDestroy {

  static URL = environment.weatherAPI_URL;
  static APPID = environment.appID;
  private currentConditions = signal<ConditionsAndZip[]>([]);
  private subs = new SubSink();

  private discriminationKeys = {
    forConditions: 'current-condition-',
    forForecasts: 'forecast-'
  };

  constructor(
    private http: HttpClient,
    private locationService: LocationService,
    private cacheService: CacheService,
    private notificationService: NotificationService
  ) {
    locationService.locations$.pipe(take(1)).subscribe(locations => {
        for (let loc of locations)
          this.addCurrentConditions(loc);
    });

    this.subs.add( locationService.locationHasBeenRemoved$.subscribe(this.removeCurrentConditions.bind(this)));
    this.subs.add( locationService.locationHasBeenAdded$.subscribe(this.addCurrentConditions.bind(this)));

    // The time will start after 2 seconds
    this.subs.add(timer(2000, environment.cacheCheckAndApiUpdateInterval).subscribe(() => {
      locationService.locations$.pipe(take(1)).subscribe(locations => {
        for (let loc of locations)
          this.updateCurrentCondition(loc);
      });
    }))
  }

  /**
   * Checks if the current condition is outdated, in affirmative case
   * this will request other instance to the server and update 
   * both in cache and in the screen view
   * @param zipcode 
   */
  updateCurrentCondition(zipcode: string) {
    if (this.cacheService.getItem(`${this.discriminationKeys.forConditions}${zipcode}`) === null) {
        this.getCurrentConditionFromAPI(zipcode).subscribe(
          data => {
            this.currentConditions.mutate(conditions => {
              let index = conditions.findIndex(condition => condition.zip === zipcode);
              console.log(data)
              this.notificationService.show('Data synchronized from server')
              return conditions[index].data = data;
            });
            this.cacheService.setItem(`${this.discriminationKeys.forConditions}${zipcode}`, data);
          },
          error => {
            this.notificationService.show('The zipcode provided doesn\'t existe in our database, please, Try another! Thanks', 'error');
            this.locationService.removeLocation(zipcode, true)
          }
        );
    }
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getCurrentConditionFromAPI(zipcode:string) : Observable<CurrentConditions> {
    return this.http.get<CurrentConditions>(`${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`);
  }

  addCurrentConditions(zipcode: string): void {
    const dataFromCache = this.cacheService.getItem(`${this.discriminationKeys.forConditions}${zipcode}`)
    if (dataFromCache !== null) {
      this.currentConditions.mutate(conditions => conditions.push({zip: zipcode, data: dataFromCache}));
    } else {
      this.http.get<CurrentConditions>(`${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`)
        .subscribe(
          data => {
            this.currentConditions.mutate(conditions => conditions.push({zip: zipcode, data}));
            this.cacheService.setItem(`${this.discriminationKeys.forConditions}${zipcode}`, data);
          },
          error => {
            this.notificationService.show('The zipcode provided doesn\'t existe in our database, please, Try another! Thanks', 'error');
            this.locationService.removeLocation(zipcode, true)
          }
        );
    }

  }

  removeCurrentConditions(zipcode: string) {
    this.cacheService.removeItem(`${this.discriminationKeys.forConditions}${zipcode}`);
    this.currentConditions.mutate(conditions => {
      for (let i in conditions) {
        if (conditions[i].zip == zipcode)
          conditions.splice(+i, 1);
      }
    })
  }

  getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    const dataFromCache = this.cacheService.getItem(`${this.discriminationKeys.forForecasts}${zipcode}`);
    if (dataFromCache !== null) {
      return of(dataFromCache);
    } else {
      return this.http.get<Forecast>(`${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`)
        .pipe(tap( (data) => {
          this.cacheService.setItem(`${this.discriminationKeys.forForecasts}${zipcode}`, data)
        }));
    }
  }

}
