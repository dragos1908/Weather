export interface WeatherApiResponse {
  location: WeatherLocation;
  current: CurrentWeather;
  forecast: WeatherForecast;
}

export interface WeatherLocation {
  name: string;
  country: string;
  localtime: string;
  lat: number;
  lon: number;
  tz_id: string;
}

export interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  wind_kph: number;
  wind_mph: number;
  humidity: number;
  feelslike_c: number;
  feelslike_f: number;
  is_day: number;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherForecast {
  forecastday: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: ForecastDaySummary;
  hour: HourWeather[];
}

export interface ForecastDaySummary {
  maxtemp_c: number;
  mintemp_c: number;
  maxtemp_f: number;
  mintemp_f: number;
  daily_chance_of_rain: number;
  condition: WeatherCondition;
}

export interface HourWeather {
  time: string;
  time_epoch: number;
  temp_c: number;
  temp_f: number;
  chance_of_rain: number;
  wind_kph: number;
  wind_mph: number;
  condition: WeatherCondition;
}
