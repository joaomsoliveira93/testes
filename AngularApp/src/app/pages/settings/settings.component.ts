import { Component, OnInit, HostBinding  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

interface display { title:string,desc:string}
interface dados {title:string,display:Array<display>,link:string}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  data:Array<dados>=[]
  filteredData: Array<dados> = [];
  title:string='Definições'
  back:string=''
  searchTerm = '';
  showInputs = false;
  isScreenSizeLessThan1200 = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  toggleInputs(): void {
    this.showInputs = !this.showInputs; 
  }

  filterData(): void {
    this.filteredData = this.data.filter(item => item.title.includes(this.searchTerm));
  }

  ngOnInit(): void {  
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      this.isScreenSizeLessThan1200 = result.matches;
    });
    this.data=[{
    title:"01010101",
    display:[{
      title:"Referencia",
      desc:"01010101"
    },{
      title:"Descrição",
      desc:"descrição do artigo 1"
    },{
      title:"Preço",
      desc:"10.00"
    },{
      title:"Quantidade",
      desc:"1"
    }],
    link:"/01010101"
  },{
    title:"02020202",
    display:[{
      title:"Referencia",
      desc:"02020202"
    },{
      title:"Descrição",
      desc:"descrição do artigo 2"
    },{
      title:"Preço",
      desc:"20.00"
    },{
      title:"Quantidade",
      desc:"2"
    }],
    link:"/02020202"
  },{
    title:"03030303",
    display:[{
      title:"Referencia",
      desc:"03030303"
    },{
      title:"Descrição",
      desc:"descrição do artigo 3"
    },{
      title:"Preço",
      desc:"30.00"
    },{
      title:"Quantidade",
      desc:"3"
    }],
    link:"/03030303"
  },{
    title:"04040404",
    display:[{
      title:"Referencia",
      desc:"04040404"
    },{
      title:"Descrição",
      desc:"descrição do artigo 4"
    },{
      title:"Preço",
      desc:"40.00"
    },{
      title:"Quantidade",
      desc:"4"
    }],
    link:"/04040404"
  },{
    title:"01010101",
    display:[{
      title:"Referencia",
      desc:"01010101"
    },{
      title:"Descrição",
      desc:"descrição do artigo 1"
    },{
      title:"Preço",
      desc:"10.00"
    },{
      title:"Quantidade",
      desc:"1"
    }],
    link:"/01010101"
  },{
    title:"02020202",
    display:[{
      title:"Referencia",
      desc:"02020202"
    },{
      title:"Descrição",
      desc:"descrição do artigo 2"
    },{
      title:"Preço",
      desc:"20.00"
    },{
      title:"Quantidade",
      desc:"2"
    }],
    link:"/02020202"
  },{
    title:"03030303",
    display:[{
      title:"Referencia",
      desc:"03030303"
    },{
      title:"Descrição",
      desc:"descrição do artigo 3"
    },{
      title:"Preço",
      desc:"30.00"
    },{
      title:"Quantidade",
      desc:"3"
    }],
    link:"/03030303"
  },{
    title:"04040404",
    display:[{
      title:"Referencia",
      desc:"04040404"
    },{
      title:"Descrição",
      desc:"descrição do artigo 4"
    },{
      title:"Preço",
      desc:"40.00"
    },{
      title:"Quantidade",
      desc:"4"
    }],
    link:"/04040404"
  },{
    title:"01010101",
    display:[{
      title:"Referencia",
      desc:"01010101"
    },{
      title:"Descrição",
      desc:"descrição do artigo 1"
    },{
      title:"Preço",
      desc:"10.00"
    },{
      title:"Quantidade",
      desc:"1"
    }],
    link:"/01010101"
  },{
    title:"02020202",
    display:[{
      title:"Referencia",
      desc:"02020202"
    },{
      title:"Descrição",
      desc:"descrição do artigo 2"
    },{
      title:"Preço",
      desc:"20.00"
    },{
      title:"Quantidade",
      desc:"2"
    }],
    link:"/02020202"
  },{
    title:"03030303",
    display:[{
      title:"Referencia",
      desc:"03030303"
    },{
      title:"Descrição",
      desc:"descrição do artigo 3"
    },{
      title:"Preço",
      desc:"30.00"
    },{
      title:"Quantidade",
      desc:"3"
    }],
    link:"/03030303"
  },{
    title:"04040404",
    display:[{
      title:"Referencia",
      desc:"04040404"
    },{
      title:"Descrição",
      desc:"descrição do artigo 4"
    },{
      title:"Preço",
      desc:"40.00"
    },{
      title:"Quantidade",
      desc:"4"
    }],
    link:"/04040404"
  },{
    title:"01010101",
    display:[{
      title:"Referencia",
      desc:"01010101"
    },{
      title:"Descrição",
      desc:"descrição do artigo 1"
    },{
      title:"Preço",
      desc:"10.00"
    },{
      title:"Quantidade",
      desc:"1"
    }],
    link:"/01010101"
  },{
    title:"02020202",
    display:[{
      title:"Referencia",
      desc:"02020202"
    },{
      title:"Descrição",
      desc:"descrição do artigo 2"
    },{
      title:"Preço",
      desc:"20.00"
    },{
      title:"Quantidade",
      desc:"2"
    }],
    link:"/02020202"
  },{
    title:"03030303",
    display:[{
      title:"Referencia",
      desc:"03030303"
    },{
      title:"Descrição",
      desc:"descrição do artigo 3"
    },{
      title:"Preço",
      desc:"30.00"
    },{
      title:"Quantidade",
      desc:"3"
    }],
    link:"/03030303"
  },{
    title:"04040404",
    display:[{
      title:"Referencia",
      desc:"04040404"
    },{
      title:"Descrição",
      desc:"descrição do artigo 4"
    },{
      title:"Preço",
      desc:"40.00"
    },{
      title:"Quantidade",
      desc:"4"
    }],
    link:"/04040404"
  }]
  this.filteredData = [...this.data];
  }

}
