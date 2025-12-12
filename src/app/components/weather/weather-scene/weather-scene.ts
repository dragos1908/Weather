import { Component, Input } from '@angular/core';
import { NgClass, NgForOf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-weather-scene',
  standalone: true,
  imports: [NgClass, NgForOf, NgStyle],
  templateUrl: './weather-scene.html'
})
export class WeatherSceneComponent {
  @Input() backgroundClass: string = 'bg-default';

  snowArray = Array.from({ length: 120 });
  rainArray = Array.from({ length: 180 });

  getRandomRainStyle() {
    return {
      left: Math.random() * 100 + 'vw',
      animationDuration: 0.4 + Math.random() * 1.2 + 's',
      animationDelay: Math.random() * 2 + 's',
      opacity: Math.random()
    };
  }

  getRandomSnowStyle() {
    return {
      left: Math.random() * 100 + 'vw',
      animationDuration: 4 + Math.random() * 6 + 's',
      animationDelay: Math.random() * 5 + 's',
      opacity: 0.4 + Math.random() * 0.6,
      width: 4 + Math.random() * 6 + 'px',
      height: 4 + Math.random() * 6 + 'px'
    };
  }
}
