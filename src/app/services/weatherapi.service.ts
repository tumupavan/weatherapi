import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Forecast } from '../interfaces/forecast';
import { Liveforecast } from '../interfaces/liveforecase';

@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {

  constructor(private httpClient: HttpClient) { }

  getWeatherDataFromSrv(): Observable<Forecast>{
    var returnVar = this.httpClient.get<Forecast>(environment.apiEndPoint);
    return returnVar;
  }

  getLiveWeatherDataFromSrv(location: string, apiKey: string): Observable<Liveforecast>{
    let finalEndPoint: string = environment.liveApiEndPoint+ apiKey + '&q='+ location+'&days=3&aqi=no&alerts=no';
    var returnVar = this.httpClient.get<Liveforecast>(finalEndPoint);
    return returnVar;
  }
}
