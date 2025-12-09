import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/WeatherService';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
})
export class App implements OnInit {

  weatherData: any;
  hourly: any[] = [];
  daily: any[] = [];      // ✅ new

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

      // ⏰ today’s 24 hours
      this.hourly = data?.forecast?.forecastday?.[0]?.hour ?? [];

      // 📅 7-day forecast
      this.daily = data?.forecast?.forecastday ?? [];

      console.log('Daily data:', this.daily);
    });
  }

  formatHour(time: string): string {
    return time.split(' ')[1]; // "YYYY-MM-DD HH:mm" -> "HH:mm"
  }

  formatDate(date: string): string {
    // "2025-12-09" -> something nicer if you want later
    return date;
  }
}

