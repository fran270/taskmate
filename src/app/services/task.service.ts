import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { Service } from './service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  taskForm!: FormGroup;

  private tasks: Task[] = [];

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private service: Service,
  ) {}

  getTasks(): Task[] {
    return [...this.tasks];
  }

  getTareas() {
    return this.service.getTasks();
  }

  createTask(task: any) {
    this.service.createTask(task).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
      },
      error: (error) =>  {
        console.log(error);
      }
    });
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  /*addTask(data: Omit<Task, 'id' | 'createdAt'>): Task {
    const task: Task = { ...data, id: this.nextId++, createdAt: new Date() };
    this.tasks.push(task);
    return task;
  }*/

  toggleComplete(id: number): void {
    const task = this.tasks.find((t) => t.id === id);
    if (task) task.completed = !task.completed;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  getStats() {
    return {
      total: this.tasks.length,
      completed: this.tasks.filter((t) => t.completed).length,
      pending: this.tasks.filter((t) => !t.completed).length,
    };
  }

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
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

  clearAll() {
    this.tasks = [];
    localStorage.removeItem('tasks');
  }
}

export { Task };
