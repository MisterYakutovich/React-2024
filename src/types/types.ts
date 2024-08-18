export interface Country {
  name: string;
  code: string;
}

export interface CountryState {
  selectedCountry: Country | null;
  countries: Country[];
}
