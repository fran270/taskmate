import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import {
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonNote,
} from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
  imports: [
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    ReactiveFormsModule,
    IonNote,
  ],
})
export class AddTaskModalComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      priority: ['media', Validators.required],
      category: ['personal'],
    });
  }

  get titleError(): string {
    const ctrl = this.taskForm.get('title');
    if (ctrl?.hasError('required')) return 'El título es obligatorio';
    if (ctrl?.hasError('minlength')) return 'Mínimo 3 caracteres';
    if (ctrl?.hasError('maxlength')) return 'Máximo 100 caracteres';
    return '';
  }

  save() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    this.modalCtrl.dismiss(this.taskForm.value);
  }
}
