import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  templateUrl: './current-weather.html'
})
export class CurrentWeatherComponent {
  @Input() weatherData: any;
}
