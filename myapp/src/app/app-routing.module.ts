import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ToDosComponent} from './components/to-dos/to-dos.component';
import { AboutComponent } from './components/pages/about/about.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';

const routes: Routes = [
  {path:'',component: ToDosComponent},
  {path:'about',component: AboutComponent},
  {path:'edit-todo',component: EditTodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
