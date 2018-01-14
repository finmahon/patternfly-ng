import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { NotificationEvent } from './notification-event';
import { NotificationType } from './notification-type';
import { NotificationService } from './notification-service/notification.service';
import { ToastNotificationComponent } from './toast-notification/toast-notification.component';
import { ToastNotificationListComponent } from './toast-notification-list/toast-notification-list.component';
import { InlineNotificationComponent } from './inline-notification/inline-notification.component';

export {
  NotificationEvent,
  NotificationType
};

/**
 * A module containing objects associated with notification components
 */
@NgModule({
  imports: [BsDropdownModule.forRoot(), CommonModule],
  declarations: [ToastNotificationComponent, ToastNotificationListComponent, InlineNotificationComponent],
  exports: [ToastNotificationComponent, ToastNotificationListComponent, InlineNotificationComponent],
  providers: [BsDropdownConfig, NotificationService]
})
export class NotificationModule {}
