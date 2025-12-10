export interface WeatherCondition {
    text: string;
    icon: string;
    code: number;
}

export interface WeatherLocation {
    name: string;
    country: string;
    localtime: string;
}

export interface WeatherCurrent {
    temp_c: number;
    condition: WeatherCondition;
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    uv: number;
}

export interface WeatherHour {
    time: string;
    temp_c: number;
    chance_of_rain: number;
    wind_kph: number;
    condition: WeatherCondition;
}

export interface WeatherDayInfo {
    maxtemp_c: number;
    mintemp_c: number;
    daily_chance_of_rain: number;
    condition: WeatherCondition;
}

export interface WeatherDay {
    date: string;
    day: WeatherDayInfo;
    hour: WeatherHour[];
}

export interface WeatherForecastResponse {
    location: WeatherLocation;
    current: WeatherCurrent;
    forecast: {
        forecastday: WeatherDay[];
    };
}
