import { Component, OnInit, inject } from '@angular/core';
import { Notification, NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private notificationSystem = inject(NotificationService);
  protected notification : Notification | null;
  ngOnInit() {
    this.notificationSystem.notifications$.subscribe(notification => {
      this.notification = (notification) ? notification : null;
    });
  }
}
