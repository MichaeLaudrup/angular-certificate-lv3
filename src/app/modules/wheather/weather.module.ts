import { NgModule } from "@angular/core";
import { ZipcodeEntryComponent } from "./components/zipcode-entry/zipcode-entry.component";
import { CurrentConditionsComponent } from "./pages/current-conditions/current-conditions.component";
import { ForecastsListComponent } from "./pages/forecasts-list/forecasts-list.component";
import { MainPageComponent } from "./pages/main-page.component";
import { WeatherRoutingModule } from "./weather-routing.module";
import { TabsNavigatorComponent } from "app/shared/components/tabs-navigator/tabs-navigator.component";
import { CommonModule } from "@angular/common";
import { LocationService } from "./services/location.service";
import { WeatherService } from "./services/weather.service";
import { CacheService } from "app/core/services/cache.service";
import { IconNameFromWeatherPipe } from "app/shared/pipes/icon-name-from-weather.pipe";

@NgModule({
    declarations: [
        ZipcodeEntryComponent,
        ForecastsListComponent,
        CurrentConditionsComponent,
        MainPageComponent
    ],
    imports: [
        CommonModule,
        WeatherRoutingModule,
        TabsNavigatorComponent,
        IconNameFromWeatherPipe
    ],
    providers: [
        LocationService, WeatherService, CacheService
    ]
})
export class WeatherModule {

}