import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './model/todo';
import { TodoService } from './service/todo.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  todos$: Observable<Todo[]> = this.todoService.getAll();

  selectedTodo: Todo = new Todo();

  // filter 
  filterPhrase: string = '';

  // sorter
  sortBy: string = 'id';

  // delete
  selectedTodoToDelete: Todo = new Todo();

  // regex
  validRegex = /^[a-zA-Z0-9\s]*$/;



  constructor(
    private todoService: TodoService,
    
  ) {}

  setToDelete(todo: Todo): void {
    this.selectedTodoToDelete = todo;
  }

  deleteItem(): void {
    this.todoService.remove(this.selectedTodoToDelete).subscribe(
      () => {
        this.todos$ = this.todoService.getAll();
      }
    );
  }

  sortData(param: string): void {
    this.sortBy = param;
  }

  switchActive(todo: Todo): void {
    try {
      todo.active === false ? todo.active = true : todo.active = false;
      this.todoService.update(todo).subscribe(
        () => this.todos$ = this.todoService.getAll()
      );
    } catch (error) {
      console.log(error);
    }
  }

  onFormSubmit(todo: Todo): void {

    try {
      this.todoService.create(todo).subscribe(
        () => this.todos$ = this.todoService.getAll()
      );
    } catch (error) {
      console.log(error);
    }
  }


}