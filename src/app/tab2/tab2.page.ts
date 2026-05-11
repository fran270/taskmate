import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { IonSearchbar, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonFab, IonFabButton, IonIcon, IonCheckbox, IonBadge} from '@ionic/angular/standalone';
import { TaskService, Task } from '../services/task.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { AddTaskModalComponent } from '../components/add-task-modal/add-task-modal.component';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { IonButton } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, 
    IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonCheckbox, IonIcon, IonBadge, 
    IonFab, IonFabButton, FormsModule, CommonModule, IonButton]
})


export class Tab2Page {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedFilter = 'all';

  constructor(private taskService: TaskService, private router: Router,   
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
      addIcons({
        add
      });
    }

  ionViewWillEnter() {
    this.tasks = this.taskService.getTasks();
    this.applyFilter();
  }

  filterTasks(event: any) {
    const query = event.target.value?.toLowerCase() || '';
    this.filteredTasks = this.tasks.filter(t => t.title.toLowerCase().includes(query));
  }

  applyFilter() {
    if (this.selectedFilter === 'pending') this.filteredTasks = this.tasks.filter(t => !t.completed);
    else if (this.selectedFilter === 'done') this.filteredTasks = this.tasks.filter(t => t.completed);
    else this.filteredTasks = [...this.tasks];
  }

  onToggle(task: Task) { this.taskService.toggleComplete(task.id); }

  goToDetail(id: number) { this.router.navigate(['/task-detail', id]); }

  async openAddModal() { 
    const modal = await this.modalCtrl.create({ component: AddTaskModalComponent });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.taskService.addTask({ ...data, completed: false });
      this.tasks = this.taskService.getTasks();
      this.applyFilter();
      // Mostrar Toast de confirmación
      const toast = await this.toastCtrl.create({
        message: '✅ Tarea creada correctamente',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      await toast.present();
    }
  }


  async confirmClearAll() {

    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Seguro que quieres eliminar todas las tareas?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.taskService.clearAll();
          }
        }
      ]
    });
  
    await alert.present();
  }

}
