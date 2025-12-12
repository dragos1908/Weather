import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { WeatherService } from './services/WeatherService';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar';
import { WeatherSceneComponent } from './components/weather/weather-scene/weather-scene';
import { WeatherPanelComponent } from './components/weather/weather-panel/weather-panel';



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [
    SearchBarComponent,
    WeatherSceneComponent,
    WeatherPanelComponent,
  ]

})
export class App implements OnInit {
  weatherData: any;
  hourly: any[] = [];
  daily: any[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {
  }


  ngOnInit() {
  }

  search(city: string) {
    city = city.trim();
    if (!city) return;

    console.log('[App] search called with:', city);
    this.loadWeather(city);
  }


  private loadWeather(city: string) {
    this.loading = true;
    this.errorMessage = null;
    this.cdr.detectChanges();

    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.weatherData = data;
          this.hourly = data?.forecast?.forecastday?.[0]?.hour ?? [];
          this.daily = data?.forecast?.forecastday ?? [];

          console.log('Daily data:', this.daily);

          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.zone.run(() => {
          console.error('Error loading weather:', err);

          this.weatherData = null;
          this.hourly = [];
          this.daily = [];
          this.loading = false;
          this.errorMessage = 'Could not load weather for that city. Please try another name.';

          this.cdr.detectChanges();
        });
      }
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

  useMyLocation() {
    if (!navigator.geolocation) {
      this.errorMessage = 'Geolocation is not supported by your browser.';
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.cdr.detectChanges();

    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        this.zone.run(() => {
          const query = `${pos.coords.latitude},${pos.coords.longitude}`;
          this.loadWeather(query);
        });
      },
      (err: GeolocationPositionError) => {
        this.zone.run(() => {
          this.loading = false;

          switch (err.code) {
            case err.PERMISSION_DENIED:
              this.errorMessage = 'Location permission denied.';
              break;
            case err.POSITION_UNAVAILABLE:
              this.errorMessage = 'Location unavailable.';
              break;
            case err.TIMEOUT:
              this.errorMessage = 'Location request timed out.';
              break;
            default:
              this.errorMessage = 'Could not get your location.';
          }

          this.cdr.detectChanges();
        });
      },
      {enableHighAccuracy: true, timeout: 10000}
    );

  }
}

