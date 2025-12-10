import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hour-card',
  standalone: true,
  templateUrl: './hour-card.html'
})
export class HourCardComponent {
  @Input() time!: string;
  @Input() iconUrl!: string;
  @Input() tempC!: number;
  @Input() chanceOfRain!: number;
  @Input() windKph!: number;
}
