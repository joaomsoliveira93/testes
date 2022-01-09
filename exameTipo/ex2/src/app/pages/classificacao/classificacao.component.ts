import { Component, OnInit } from '@angular/core';
import { Atleta } from 'src/app/models/atleta';
import {DataServiceService} from '../../services/data-service.service';

@Component({
  selector: 'app-classificacao',
  templateUrl: './classificacao.component.html',
  styleUrls: ['./classificacao.component.css']
})
export class ClassificacaoComponent implements OnInit {

  atletas = new Array<Atleta>();

  constructor(private dataService: DataServiceService) { 
    this.dataService.getAll().subscribe(atletas => {
      this.atletas = atletas
    });
  }

  ngOnInit(): void {
  }

}
