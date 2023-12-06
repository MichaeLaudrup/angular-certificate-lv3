import {ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, Signal} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {LocationService} from "../../services/location.service";
import {Router} from "@angular/router";
import {ConditionsAndZip} from '../../models/conditions-and-zip.type';
import { TabData } from 'app/shared/interfaces/tab-data.interface';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class CurrentConditionsComponent implements OnInit {
  ngOnInit(): void {
  }

  private weatherService = inject(WeatherService);
  private router = inject(Router);
  protected currentLocationSelected : ConditionsAndZip | undefined;
  protected locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();
  private previouslyEmpty = true;
  constructor() {
    effect(() => {
      if(this.currentConditionsByZip().length > 0) {
        if (this.previouslyEmpty) {
          this.currentLocationSelected = this.currentConditionsByZip()[0];
          this.previouslyEmpty = !this.previouslyEmpty
        }
        
      } else {
        this.currentLocationSelected = undefined;
      }
    })
  }
  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode]);
  }

  get tabsLinksFromCurrentConditions(): TabData[] {
    return this.currentConditionsByZip().map(condAndZip => ({
      label: `${condAndZip.data.name} (${condAndZip.zip})`,
      link: condAndZip.zip
    }));
  }

  processTabSelection(zipcodeSelected: string) {
    this.currentLocationSelected = computed(() => {
      return this.currentConditionsByZip().find(location => location.zip === zipcodeSelected)
    })();
  }

  processTabDeletion(zipcodeToDelete: string) {
    this.locationService.removeLocation(zipcodeToDelete);
    if (this.currentLocationSelected.zip === zipcodeToDelete) {
      this.currentLocationSelected = this.currentConditionsByZip()[0];
      this.previouslyEmpty = true;
    };
  }
}
