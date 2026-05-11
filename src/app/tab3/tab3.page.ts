import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonItem, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonAvatar, IonBadge, IonCard, IonChip, IonList, IonLabel, IonCardContent, IonCardHeader, IonCardSubtitle } from '@ionic/angular/standalone';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonAvatar, IonBadge,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonChip,
    IonLabel, IonList, IonItem, IonIcon, IonSegment, IonSegmentButton],
})
export class Tab3Page {
  constructor() {}
}
