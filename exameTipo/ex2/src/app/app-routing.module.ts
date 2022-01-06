import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassificacaoComponent } from './pages/classificacao/classificacao.component'
import { DetalhesAtletaComponent } from './pages/detalhes-atleta/detalhes-atleta.component';


const routes: Routes = [
  {path:"", component:ClassificacaoComponent},
  {path:"/atleta/:id", component:DetalhesAtletaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
