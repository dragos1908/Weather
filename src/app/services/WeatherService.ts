import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { WeatherApiResponse } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '4ceffb5a93f644fcabc133943250812';
  private baseUrl = 'https://api.weatherapi.com/v1/forecast.json';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherApiResponse> {
    return this.http.get<WeatherApiResponse>(
      `${this.baseUrl}?key=${this.apiKey}&q=${city}&days=7&aqi=yes&alerts=no`
    );
  }

  searchCities(query: string): Observable<any[]> {
    const trimmed = query.trim();
    if (!trimmed) {
      return of([]);
    }

    const url = `https://api.weatherapi.com/v1/search.json?key=${this.apiKey}&q=${encodeURIComponent(trimmed)}`;

    return this.http.get<any[]>(url);
  }

}
