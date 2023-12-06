import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'warning';

export interface Notification {
  message: string;
  type: NotificationType
}


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  public notifications$: Observable<Notification> = this.notificationSubject.asObservable();
  
  constructor() { }

  show(message: string, type: NotificationType = 'success') {
    const notification: Notification = { message, type };
    this.notificationSubject.next(notification);
    setTimeout(() => this.notificationSubject.next(null), environment.notificationsDelay);
  }


}
