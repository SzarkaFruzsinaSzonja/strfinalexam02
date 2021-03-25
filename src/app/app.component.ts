import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './model/todo';
import { TodoService } from './service/todo.service';

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
  filterKey: string = 'title';

  // sorter
  sortby: string = 'id';

  constructor(
    private todoService: TodoService,
  ) {}
  ngOnInit(): void {
  }

  setToDelete(id: Todo): void {
    this.selectedTodo = id;
  }

  deleteItem(): void {
    this.todoService.remove(this.selectedTodo).subscribe(
      () => {
        this.todos$ = this.todoService.getAll();
      }
    );
  }

  sortData(param: string): void {
    this.sortby = param;
    let tableHeaders = document.querySelectorAll('th');
    tableHeaders.forEach( item => item.classList.remove('active'));
    document.querySelector('#'+param)?.classList.add('active');
  }

}
