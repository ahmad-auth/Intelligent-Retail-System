import { Component, OnInit } from '@angular/core';
import { IrsapiService } from '../../irsapi.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-sales-forecast',
  templateUrl: './sales-forecast.component.html',
  styleUrls: ['./sales-forecast.component.css']
})
export class SalesForecastComponent implements OnInit {

  forecastData: any = [];

  date: any = []; 
  readableDate: any = [];
  value: any = [];
  chart = [];
  constructor(
    private irsApiService: IrsapiService
  ) { }

  ngOnInit(): void {

    this.irsApiService.getApiRecords('/predict/').subscribe(
      data => {
        this.forecastData = data;
        let dataObject = JSON.parse(this.forecastData.toString());
        for(let key in dataObject["ds"]){

          let unixTimestamp = dataObject["ds"][key];
          let dateObj = new Date(unixTimestamp); 
          this.date.push(dateObj);
          const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          this.readableDate.push(monthNames[dateObj.getMonth()]+'/'+dateObj.getFullYear());
        }

        for(let key in dataObject["y"]){

          this.value.push(Math.round(dataObject["y"][key]));
        }
        let dataObjects = [];
        for(let i = 0; i < this.date.length; i++){
          let obj = { x: this.date[i], y:this.value[i]};
          dataObjects.push(obj);
        }
        console.log(dataObjects);
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.readableDate,
            datasets: [
              { 
                label: 'Monthly Sales',
                data: dataObjects,
                borderColor: "#3cba9f",
                fill: true
              },
              // { 
              //   data: this.value,
              //   borderColor: "#ffcc00",
              //   fill: false
              // },
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            },
            responsive: false
          }
        });
      },
      error => {
        console.log(error);
      }
    )
    
    
  
  };

}
