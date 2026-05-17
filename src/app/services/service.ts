import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient){}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  createTask(task: any): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task);
  }
}
