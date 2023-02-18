import { Pipe, PipeTransform } from '@angular/core';
import { ITodo } from '../models/todo.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(todolist: ITodo[], filterText: string): ITodo[] {
    return todolist ? todolist.filter(item => item.description.search(new RegExp(filterText, 'i')) > -1) : [];
  }

}
