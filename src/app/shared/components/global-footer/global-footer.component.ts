import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-global-footer',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>&copy; 2023 This content is based on a "Angular Training" assignment created by Alan Chair, but it's been modified by Michael Laudrup Luis González following task guidelines .</p>
    `,
    styleUrls: ['./global-footer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalFooterComponent { }
