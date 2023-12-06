import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-global-footer',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>&copy; 2023 This content is based on the "Angular Training" code used for completing an assignment. However, it has been modified by Michael Laudrup and Luis González in accordance with the task guidelines.</p>
    `,
    styleUrls: ['./global-footer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalFooterComponent { }
