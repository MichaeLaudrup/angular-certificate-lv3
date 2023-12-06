import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConditionsAndZip } from 'app/modules/wheather/models/conditions-and-zip.type';
import { LocationService } from 'app/modules/wheather/services/location.service';
import { WeatherService } from 'app/modules/wheather/services/weather.service';

@Component({
    selector: 'app-current-condition-card',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
    templateUrl: 'current-condition-card.component.html',
    styleUrls: ['./current-condition-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentConditionCardComponent {
    @Input() location: ConditionsAndZip;
    protected locationService = inject(LocationService);
    protected weatherService = inject(WeatherService);
 }
