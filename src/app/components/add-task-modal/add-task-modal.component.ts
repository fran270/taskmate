import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonNote,
} from '@ionic/angular/standalone';

import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons,
    IonIcon,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    FormsModule,
    IonNote,
  ],
})
export class AddTaskModalComponent {
  title = '';
  description = '';
  priority = 'media';
  error = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (!this.title.trim()) return;
    this.modalCtrl.dismiss({
      title: this.title,
      description: this.description,
      priority: this.priority,
    });
  
  }
}
