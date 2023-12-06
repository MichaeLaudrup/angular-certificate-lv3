import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NotificationType } from 'app/core/services/notification.service';

@Component({
    selector: 'app-notification-modal',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: 'notification-modal.component.html',
    styleUrls: ['./notification-modal.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationModalComponent { 
    @Input() message: string = 'This is a test notification text';
    @Input() kindOfNotification : NotificationType = 'success';
}
