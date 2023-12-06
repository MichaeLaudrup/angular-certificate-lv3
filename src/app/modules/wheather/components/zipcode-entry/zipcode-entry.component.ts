import { Component } from '@angular/core';
import {LocationService} from "../../services/location.service";

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  styleUrls: ['./zipcode-entry.component.css']
})
export class ZipcodeEntryComponent {

  constructor(private locationService : LocationService) {}

  addLocation(zipcode : string){
    this.locationService.addLocation(zipcode);
  }

}
