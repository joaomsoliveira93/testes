import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Todo} from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions={
  headers: new HttpHeaders({ 
    'content-type' : 'application/json'
  })  
}

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  todosUrl:string='http://localhost:5000/todos';
  constructor(
    private http:HttpClient
  ) { }


  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl);
  }

  //toggle completed 
  toggleCompleted(todo:Todo):Observable<any> {
    const url = this.todosUrl + "/" + todo.id;
    return this.http.put(url,todo,httpOptions);
  }

  deleteTodo(todo:Todo):Observable<Todo> {
    const url = this.todosUrl + "/" + todo.id;
    return this.http.delete<Todo>(url,httpOptions);
  }

  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl,todo,httpOptions);
  }

  editTodo(todo:Todo):Observable<any>{
    const url = this.todosUrl + "/" + todo.id;
    return this.http.put(url,todo,httpOptions);
  }
}
