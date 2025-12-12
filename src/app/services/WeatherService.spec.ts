import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './WeatherService';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call forecast endpoint with days=7 and aqi=yes', () => {
    service.getWeather('London').subscribe();

    const req = httpMock.expectOne((r) =>
      r.url.includes('https://api.weatherapi.com/v1/forecast.json') &&
      r.urlWithParams.includes('q=London') &&
      r.urlWithParams.includes('days=7') &&
      r.urlWithParams.includes('aqi=yes')
    );

    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
