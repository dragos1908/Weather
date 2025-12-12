import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/WeatherService';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './search-bar.html'
})
export class SearchBarComponent {
  @Output() citySelected = new EventEmitter<string>();

  searchTerm = '';
  suggestions: any[] = [];
  showSuggestions = false;
  isLoading = false;

  constructor(private weatherService: WeatherService) {}

  onInputChange(value: string) {
    this.searchTerm = value;
    const trimmed = value.trim();

    if (trimmed.length < 2) {
      this.suggestions = [];
      this.showSuggestions = false;
      return;
    }

    this.isLoading = true;
    this.weatherService.searchCities(trimmed).subscribe({
      next: (results) => {
        this.suggestions = results || [];
        this.showSuggestions = this.suggestions.length > 0;
        this.isLoading = false;
      },
      error: () => {
        this.suggestions = [];
        this.showSuggestions = false;
        this.isLoading = false;
      }
    });
  }

  submitValue(rawValue: string) {
    const trimmed = rawValue.trim();
    if (!trimmed) return;

    console.log('[SearchBar] submitValue:', trimmed);
    this.searchTerm = trimmed;
    this.citySelected.emit(trimmed);
    this.showSuggestions = false;
  }

  onEnter(event: Event) {
    event.preventDefault();
    const value = (event.target as HTMLInputElement)?.value ?? '';
    console.log('[SearchBar] onEnter, value:', value);
    this.submitValue(value);
  }

  selectSuggestion(suggestion: any) {
    const name = suggestion.name;
    const region = suggestion.region;
    const country = suggestion.country;

    const full = region ? `${name}, ${region}` : `${name}, ${country}`;
    console.log('[SearchBar] selectSuggestion:', full);
    this.searchTerm = full;
    this.citySelected.emit(full);
    this.showSuggestions = false;
  }
}
