import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Signal, TemplateRef, ViewChild} from '@angular/core';
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
export class CurrentConditionsComponent implements AfterViewInit {

  private weatherService = inject(WeatherService);
  private router = inject(Router);
  protected currentLocationSelected : ConditionsAndZip | undefined;
  protected locationService = inject(LocationService);

  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();
  @ViewChild('cardTemplate') cardTemplate: TemplateRef<any>
  
  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  get tabsDataFromCurrentConditions(): TabData[] {
    return this.currentConditionsByZip().map((condAndZip: ConditionsAndZip) => {
      return {
        label: `${condAndZip.data.name} (${condAndZip.zip})`,
        tabId: condAndZip.zip,
        template: this.cardTemplate,
        context: { location: condAndZip }
      }
    });
  }

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode]);
  }

  conditionDeleted(zip :string) {
    this.locationService.removeLocation(zip);
  }
}
