import { Injectable } from '@angular/core';
import { NotificationService } from 'app/core/services/notification.service';
import { BehaviorSubject, Subject } from 'rxjs';

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  locations : BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  locationHasBeenRemoved: Subject<string> = new Subject<string>();
  locationHasBeenAdded: Subject<string> = new Subject<string>();

  locations$ = this.locations.asObservable();
  locationHasBeenRemoved$ = this.locationHasBeenRemoved.asObservable();
  locationHasBeenAdded$ = this.locationHasBeenAdded.asObservable();

  constructor(private notificationService: NotificationService) {
    let locationsFromLocalStorage =  JSON.parse(localStorage.getItem(LOCATIONS));
    if (locationsFromLocalStorage)
      this.locations.next(locationsFromLocalStorage)
  }

  addLocation( zipcode : string) {
    const currentLocations = this.locations.getValue();
    if (!currentLocations.includes(zipcode)) {
      let updateLocations = [...currentLocations, zipcode];
      localStorage.setItem(LOCATIONS, JSON.stringify(updateLocations));
      this.locations.next(updateLocations);
      this.locationHasBeenAdded.next(zipcode);
    } else {
      this.notificationService.show('You have already that zipcode inserted, please, try other one!', 'error')
    }
  }

  removeLocation(zipcode : string, dontNotifyOfRemoving = false) {
    const currentLocations = this.locations.getValue();
    const updatedLocations = currentLocations.filter((iteratorZipCode) => iteratorZipCode !== zipcode);
    localStorage.setItem(LOCATIONS, JSON.stringify(updatedLocations));
    this.locations.next(updatedLocations)

    if(!dontNotifyOfRemoving)
      this.locationHasBeenRemoved.next(zipcode);
  }
}
