import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { ITodoRequest } from 'src/app/shared/models/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {

  todoForm: FormGroup;
  todoId: number;

  constructor(
    private fb: FormBuilder,
    private todoSvc: TodoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.todoForm = this.fb.group({
      label: [],
      description: [],
      category: [],
      endDate: [],
      status: [],
    });

    this.todoId = this.activatedRoute.snapshot?.params['id'];
    
    if (this.todoId) {
      this.initializedFormData();
    }
  }

  saveTodo(): void {
    const request: ITodoRequest = {
      category: this.todoForm.get('category')?.value,
      description: this.todoForm.get('description')?.value,
      label: this.todoForm.get('label')?.value,
      endDate: this.todoForm.get('endDate')?.value,
      status:  this.todoForm.get('status')?.value,
    }

    if (this.todoId) {
      this.todoSvc.updateTodo(this.todoId, request).subscribe(res => {
        if (res) {
          this.router.navigateByUrl('/todo');
        }
      });
    } else {
      this.todoSvc.addTodo(request).subscribe(res => {
        if (res) {
          this.router.navigateByUrl('/todo');
        }
      });
    }
  }

  initializedFormData(): void {
    this.todoSvc.getTodoById(this.todoId).subscribe(todo => {
      this.todoForm.patchValue({
        category: todo?.category,
        description: todo?.description,
        label: todo?.description,
        endDate: todo?.endDate,
        status: todo?.status
      });
    })
  }

}
