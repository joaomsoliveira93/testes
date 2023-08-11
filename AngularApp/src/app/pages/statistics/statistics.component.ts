import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  apiData: any; // Variable to store the API response

  constructor() { }

  ngOnInit(): void {
    this.getDataFromAPI();
  }

  async getDataFromAPI(): Promise<void> {
    try {
      const response = await axios.get(`http://38.242.201.176:3010/api/getutilizadores`);
      this.apiData = response.data;
      console.log(this.apiData);
    } catch (error) {
      console.error(error);
    }
  }
}