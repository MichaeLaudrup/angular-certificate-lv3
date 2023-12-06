import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-assignement-justification',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './assignement-justification.component.html',
    styleUrls: ['./assignement-justification.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignementJustificationComponent { }
