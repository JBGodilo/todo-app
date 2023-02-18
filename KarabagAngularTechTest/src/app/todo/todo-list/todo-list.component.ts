import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { ITodo } from 'src/app/shared/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  
  todoList: ITodo[] = [];
  searchTerm: string = '';
  allTodos: ITodo[] = [];

  constructor(private todoSvc: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.todoSvc.getTodoList().subscribe(todos => {
      this.todoList = todos;
      this.allTodos = this.todoList;
    });
  }

  addNewTodo(): void {
    this.router.navigateByUrl('/todo/add');
  }

  editTodo(todo: ITodo): void {
    this.router.navigateByUrl(`/todo/${todo?.id}`)
  }

  deleteTodo(todo: ITodo): void {
    this.todoSvc.deleteTodo(todo.id).subscribe(() => {
      const todoIndex = this.todoList.findIndex(t => t.id === todo.id);
      this.todoList.splice(todoIndex, 1);
    })
  }

  search(value: string): void {
    this.todoList = this.allTodos.filter((val) =>
      val.description.toLowerCase().includes(value)
    );
  }
}
