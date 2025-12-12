import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DayCardComponent } from '../day-card/day-card';

@Component({
  selector: 'app-daily-forecast',
  standalone: true,
  imports: [NgFor, NgIf, DayCardComponent],
  templateUrl: './daily-forecast.html'
})
export class DailyForecastComponent {
  @Input() daily: any[] = [];
  @Input() formatDate!: (date: string) => string;
}
