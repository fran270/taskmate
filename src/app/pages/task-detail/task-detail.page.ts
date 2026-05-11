import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonAlert } from '@ionic/angular/standalone';
import { IonButtons, IonBackButton, IonButton, IonIcon, IonBadge, IonNote, IonInput} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonBackButton, IonButton, IonIcon, IonBadge, IonNote, IonAlert, IonInput]
})


export class TaskDetailPage implements OnInit {
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.task = this.taskService.getTaskById(id);
  }

  toggleComplete() {
    if (this.task) {
      this.taskService.toggleComplete(this.task.id);
      this.task = this.taskService.getTaskById(this.task.id);
    }
  }

  async deleteTask() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar tarea',
      message: '¿Estás seguro? Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => {
          this.taskService.deleteTask(this.task!.id);
          this.router.navigate(['/tabs/tab2']);
        }}
      ]
    });
    await alert.present();
  }
}
