import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  id: number = 0;
  title: string = "";
  completed: boolean=false;

  constructor(private router:Router, private todoService:TodoService) {
    if (history.state.data != null) {
      this.id = history.state.data.id;
      this.title = history.state.data.title;
      this.completed = history.state.data.completed;
    }else{
      this.router.navigate(["/"]);
    }

  }

  ngOnInit(): void {}

  onSubmit(){
    const todo={
      id:this.id,
      title:this.title,
      completed:this.completed
    }

    this.todoService.editTodo(todo).subscribe(todo =>{
      console.log(todo)});
    this.router.navigate(["/"]);

  }

  onCancel(){
    this.router.navigate(["/"]);
  }

}
