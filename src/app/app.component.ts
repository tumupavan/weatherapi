import { Component, EventEmitter, Input, Output } from '@angular/core';
import { delay } from 'rxjs';
import { Forecast, Period } from './interfaces/forecast';
import { Condition, Day, Forecastday, Liveforecast, LocationFinal } from './interfaces/liveforecase';
import { WeatherapiService } from './services/weatherapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather Forecast';
  forecast: Forecast;
  liveForecast: Liveforecast;
  periodsList: Period[];
  locationNameSearched: string  = '';
  locationName: string  = '';
  currLocationArr: LocationFinal[] = [];
  forecastArr: Forecastday[] = [];
  currDay: Day;
  currCondition: Condition;
  date: Date;
  apikeyentered: string;
  apikey: string;
  
  constructor(private weatherApi: WeatherapiService){
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }

  ngOnInit(){
  }

  forecastFromOtherComponent($event: Forecast): void{
    this.forecast = $event;
    console.log($event);
    this.periodsList = this.forecast?.properties?.periods;
  }

  forecastLiveDataFromComp($event: Liveforecast): void{
    this.liveForecast = $event;
    console.log($event);
    this.currLocationArr.push(this.liveForecast.location);
    this.forecastArr = this.liveForecast.forecast.forecastday;
  }

  addNameToList($event: any) : void {
    console.log($event);
  }

  GetForecast() : void{
    this.locationName = this.locationNameSearched;
    this.apikey = this.apikeyentered;
    this.currLocationArr = [];
  }

}
