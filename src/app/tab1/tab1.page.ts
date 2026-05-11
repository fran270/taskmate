import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonProgressBar } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { IonGrid, IonRow, IonCol, IonButton, IonIcon, IonList, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
    IonGrid, IonCardTitle, IonCardContent, IonRow, IonCol, IonButton, IonIcon,
    IonList, IonItem, IonProgressBar],
})

export class Tab1Page {
  constructor() {
    addIcons({
      add
    });
  }
}
