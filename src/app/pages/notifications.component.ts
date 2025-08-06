import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipListbox, MatChipListboxChange, MatChipOption, MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationsService, NotificationItem } from '../services/notifications.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    TranslateModule,
    MatChipsModule,
    MatChipOption,
    MatChipListbox
  ],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: NotificationItem[] = [];
  filtered: NotificationItem[] = [];
  loading = false;
  search = '';
  typeFilter = 'all';
  onlyUnread = false;

  readonly typeLabels = {
    info: 'Information',
    urgent: 'Urgence',
    rappel: 'Rappel',
    partage: 'Document partagé'
  };

  private notifService = inject(NotificationsService);

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.loading = true;
    this.notifService.getAll().subscribe(list => {
      this.notifications = list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
      this.applyFilter();
      this.loading = false;
    });
  }

  applyFilter() {
    let list = this.notifications;
    if (this.typeFilter !== 'all') list = list.filter(n => n.type === this.typeFilter);
    if (this.onlyUnread) list = list.filter(n => !n.lu);
    if (this.search.trim()) {
      const s = this.search.trim().toLowerCase();
      list = list.filter(n =>
        n.titre.toLowerCase().includes(s) ||
        n.message.toLowerCase().includes(s) ||
        n.type.toLowerCase().includes(s)
      );
    }
    this.filtered = list;
  }

  markAsRead(n: NotificationItem) {
    n.lu = true;
    this.applyFilter();
  }
  markAsUnread(n: NotificationItem) {
    n.lu = false;
    this.applyFilter();
  }
  deleteNotif(n: NotificationItem) {
    this.notifications = this.notifications.filter(item => item !== n);
    this.applyFilter();
  }
  archiveNotif(n: NotificationItem) {
    n.archive = true;
    this.applyFilter();
  }
  unarchiveNotif(n: NotificationItem) {
    n.archive = false;
    this.applyFilter();
  }
  clearAll() {
    if (confirm('Supprimer toutes les notifications ?')) {
      this.notifications = [];
      this.applyFilter();
    }
  }
  setFilter(type: string) {
    this.typeFilter = type;
    this.applyFilter();
  }
  toggleUnread() {
    this.onlyUnread = !this.onlyUnread;
    this.applyFilter();
  }
  getUnreadCount() {
    return this.notifications.filter(n => !n.lu && !n.archive).length;
  }
}
