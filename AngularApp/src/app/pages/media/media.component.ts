import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  tableData: any[]=[];
  currentPage: number=0;
  itemsPerPage: number=0;
  title:string='Media'
  back:string=''

  ngOnInit() {
    // Initialize the table data
    this.tableData = [
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
    ];

    this.currentPage = 1; // Initial page number
    this.itemsPerPage = 20; // Number of items per page
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getTotalPages(): number {
    return Math.ceil(this.tableData.length / this.itemsPerPage);
  }

}
