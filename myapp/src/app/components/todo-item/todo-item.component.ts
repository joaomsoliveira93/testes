import { Component, OnInit,EventEmitter,Input,Output } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo:Todo = {id:0,title:'',completed:false};
  @Output() deleteTodo:EventEmitter<Todo> = new EventEmitter();

  constructor(
    private todoService:TodoService,
    private router:Router
    ) { }

  ngOnInit(): void {}

  setClasses(){
    let classes = {
      todo:true,
      'is-complete':this.todo.completed
    }

    return classes;
  }

  onToggle(todo:Todo){
    //toggle in ui
    todo.completed = !todo.completed;

    //toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo =>{
      console.log(todo);
    });
  }

  onDelete(todo:Todo){
    this.deleteTodo.emit(todo);
  }

  onEdit(todo:Todo){
    this.router.navigate(["/edit-todo"],{state:{data:this.todo}});
  }

}
