import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Forecast, Period, Properties } from 'src/app/interfaces/forecast';
import { Liveforecast } from 'src/app/interfaces/liveforecase';
import { WeatherapiService } from 'src/app/services/weatherapi.service';

@Component({
  selector: 'app-perioddata',
  templateUrl: './perioddata.component.html',
  styleUrls: ['./perioddata.component.css']
})
export class PerioddataComponent implements OnInit {

  forecast: Forecast | undefined;
  liveForecastData: Liveforecast | undefined;
  periodsList: Period[];
  properties : Properties;
  errorMessage: string;
  location: string;
  apiKeyFinal: string;

  @Input() locationName: string = '';
  @Input() apiKey: string = '';
  
  @Output() forecastToParent = new EventEmitter<Forecast>();
  @Output() forecastLiveToParent = new EventEmitter<Liveforecast>();
  @Output() childEventStr = new EventEmitter<string>();

  constructor(private weatherApi: WeatherapiService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getWeatherData();
  }

  ngOnChanges(changes: SimpleChanges){
    this.location = changes['locationName'].currentValue;
    if(changes['apiKey'] === undefined){
      this.apiKeyFinal = this.apiKeyFinal;
    }
    else{
      this.apiKeyFinal = changes['apiKey'].currentValue;
    }
    
    this.getLiveWeatherData(this.location, this.apiKeyFinal);
  }

  getWeatherData() : void {

    this.weatherApi.getWeatherDataFromSrv().subscribe(
      response => {
        if (response){
          this.forecast = response;
        }
      }, error => {
        this.errorMessage = error;
      }, () => {
        this.changeDetectorRef.detectChanges();
        this.forecast = this.forecast;
        this.periodsList = this.forecast?.properties.periods;
        this.forecastToParent.emit(this.forecast);
      }
    );
  }

  getLiveWeatherData(location: string, apiKey: string) : void {
    this.weatherApi.getLiveWeatherDataFromSrv(location, apiKey).subscribe(
      liveRes => {
        if (liveRes){
          this.liveForecastData = liveRes;
        }
      }, error => {
        this.errorMessage = error;
      }, () => {
        this.changeDetectorRef.detectChanges();
        this.forecastLiveToParent.emit(this.liveForecastData);
      }
    );
  }


}
