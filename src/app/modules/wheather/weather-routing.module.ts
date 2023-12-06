import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "./pages/main-page.component";
import { ForecastsListComponent } from "./pages/forecasts-list/forecasts-list.component";


const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
    },
    {
        path: 'forecast/:zipcode', component: ForecastsListComponent
    },
    {
        path: '**', redirectTo: '/current-conditions'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WeatherRoutingModule { }