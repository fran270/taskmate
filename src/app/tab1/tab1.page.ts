import { Component } from '@angular/core';
import { IonContent, IonFab, IonProgressBar } from '@ionic/angular/standalone';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { TaskService } from '../services/task.service';
import { DecimalPipe } from '@angular/common';

import { Task } from '../services/task.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonContent,
    IonCard,
    IonHeader,
    IonHeader,
    IonGrid,
    IonCardContent,
    IonRow,
    IonCol,
    IonToolbar,
    IonTitle,
    IonProgressBar,
    DecimalPipe,
    IonRefresher,
    IonRefresherContent,
  ],
})
export class Tab1Page {
  stats = { total: 0, completed: 0, pending: 0 };
  private tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ionViewWillEnter() {
    this.stats = this.taskService.getStats();
  }

  doRefresh(event: any) {
    this.tasks = this.taskService.getTasks();
    this.applyFilter();
    event.target.complete();
  }

  applyFilter() {
    
    const total = this.tasks.length;
    const completed = this.tasks.filter((t) => t.completed).length;
    const pending = this.tasks.filter((t) => !t.completed).length;

    this.stats = { total, completed, pending };
  }
}
