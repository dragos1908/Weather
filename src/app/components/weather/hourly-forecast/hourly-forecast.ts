import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HourCardComponent } from '../hour-card/hour-card';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [NgFor, NgIf, HourCardComponent],
  templateUrl: './hourly-forecast.html'
})
export class HourlyForecastComponent {
  @Input() hourly: any[] = [];
  @Input() formatHour!: (time: string) => string;
}
