import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConditionsAndZip } from 'app/modules/wheather/models/conditions-and-zip.type';
import { WeatherService } from 'app/modules/wheather/services/weather.service';
import { IconNameFromWeatherPipe } from 'app/shared/pipes/icon-name-from-weather.pipe';

@Component({
    selector: 'app-current-condition-card',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        IconNameFromWeatherPipe
    ],
    templateUrl: 'current-condition-card.component.html',
    styleUrls: ['./current-condition-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentConditionCardComponent {
    @Input() location: ConditionsAndZip;
    protected weatherService = inject(WeatherService);
 }
