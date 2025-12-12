import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-day-card',
  standalone: true,
  templateUrl: './day-card.html'
})
export class DayCardComponent {
  @Input() date!: string;
  @Input() iconUrl!: string;
  @Input() conditionText!: string;
  @Input() maxTempC!: number;
  @Input() minTempC!: number;
  @Input() chanceOfRain!: number;
}
