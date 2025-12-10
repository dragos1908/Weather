import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/WeatherService';
import {NgClass, NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [
    NgStyle,
    NgForOf,
    NgClass
  ]
})
export class App implements OnInit {
  snowArray = Array.from({ length: 120 });
  weatherData: any;
  hourly: any[] = [];
  daily: any[] = [];
  rainArray = Array.from({ length: 180 });


  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadWeather('Bucharest');
  }

  search(city: string) {
    city = city.trim();
    if (!city) return;

    this.loadWeather(city);
  }

  private loadWeather(city: string) {
    this.weatherService.getWeather(city).subscribe(data => {
      this.weatherData = data;

      this.hourly = data?.forecast?.forecastday?.[0]?.hour ?? [];

      this.daily = data?.forecast?.forecastday ?? [];

      console.log('Daily data:', this.daily);
    });
  }

  formatHour(time: string): string {
    return time.split(' ')[1];
  }

  formatDate(date: string): string {
    return date;
  }

  getBackgroundClass(): string {
    if (!this.weatherData) return 'bg-default';

    const condition = this.weatherData.current.condition.text.toLowerCase();

    if (condition.includes('sun') || condition.includes('clear')) {
      return 'bg-sunny sun-on';
    }

    if (condition.includes('snow') || condition.includes('ice')) {
      return 'bg-snow snow-on';
    }

    if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'bg-rainy rain-on';
    }

    if (condition.includes('storm') || condition.includes('thunder')) {
      return 'bg-storm rain-on storm-on';
    }

    if (condition.includes('fog') || condition.includes('mist') || condition.includes('haze')) {
      return 'bg-cloudy fog-on';
    }

    return 'bg-default';
  }

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

