import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodoRequest, ITodo } from 'src/app/shared/models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiBaseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  
  getTodoList(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.apiBaseUrl}/tasks`);
  }

  addTodo(request: ITodoRequest): Observable<ITodo> {
    return this.http.post<ITodo>(`${this.apiBaseUrl}/tasks`, request);
  }

  getTodoById(todoId: number): Observable<ITodo> {
    return this.http.get<ITodo>(`${this.apiBaseUrl}/tasks/${todoId}`);
  }

  updateTodo(todoId: number, request: ITodoRequest): Observable<ITodo> {
    return this.http.patch<ITodo>(`${this.apiBaseUrl}/tasks/${todoId}`, request);
  }

  deleteTodo(todoId: number): Observable<ITodo> {
    return this.http.delete<ITodo>(`${this.apiBaseUrl}/tasks/${todoId}`);
  }
}
