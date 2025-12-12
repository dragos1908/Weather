import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { SearchBarComponent } from '../../search-bar/search-bar';
import { CurrentWeatherComponent } from '../current-weather/current-weather';
import { HourlyForecastComponent } from '../hourly-forecast/hourly-forecast';
import { DailyForecastComponent } from '../daily-forecast/daily-forecast';

@Component({
  selector: 'app-weather-panel',
  standalone: true,
  imports: [
    NgIf,
    SearchBarComponent,
    CurrentWeatherComponent,
    HourlyForecastComponent,
    DailyForecastComponent
  ],
  templateUrl: './weather-panel.html'
})
export class WeatherPanelComponent {
  @Input() weatherData: any;
  @Input() hourly: any[] = [];
  @Input() daily: any[] = [];
  @Input() formatHour!: (time: string) => string;
  @Input() formatDate!: (date: string) => string;

  @Input() loading: boolean = false;
  @Input() errorMessage: string | null = null;

  @Output() citySelected = new EventEmitter<string>();
  @Output() myLocationRequested = new EventEmitter<void>();
}
