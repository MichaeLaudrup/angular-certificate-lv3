import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-global-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
    templateUrl: "./global-header.component.html",
    styleUrls: ['./globalHeader.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalHeaderComponent {
    @Input() labelsAndLinks: Array<{label:string, link: string}> = [
        {
            label: 'Wheather app', link: 'weather-app'
        },
        {
            label: 'Assignment Justifications', link: 'justifications'
        }
    ]
}
