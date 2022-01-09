import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Atleta } from 'src/app/models/atleta';
import { DataServiceService } from 'src/app/services/data-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-atleta',
  templateUrl: './detalhes-atleta.component.html',
  styleUrls: ['./detalhes-atleta.component.css']
})
export class DetalhesAtletaComponent implements OnInit {
  private id:number = 0;
   atleta:Atleta=new Atleta();
   times:Array<number>=[];

  constructor(private route:ActivatedRoute,private dataservice:DataServiceService ) { 
    this.route.params.subscribe(params => {
      this.id = params['id'];
      
    });
    this.dataservice.getByDorsal(this.id).subscribe(atleta=>{
      this.atleta=atleta;
    })
    
    this.times=this.atleta.times!;
  }

  ngOnInit(): void {
    
  }

}
