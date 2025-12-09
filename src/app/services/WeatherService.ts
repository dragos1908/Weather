import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '4ceffb5a93f644fcabc133943250812';
  private baseUrl = 'https://api.weatherapi.com/v1/forecast.json';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}?key=${this.apiKey}&q=${city}&days=7&aqi=yes&alerts=no`
    );
  }
}
