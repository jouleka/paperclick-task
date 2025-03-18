declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (
            inputField: HTMLInputElement,
            options?: AutocompleteOptions,
          ) => GoogleAutocomplete
          AddressComponent: AddressComponent
        }
        LatLng: new (lat: number, lng: number) => GoogleLatLng
      }
    }
  }
}

export interface GoogleAutocomplete {
  addListener(event: string, callback: () => void): void
  getPlace(): GooglePlaceResult
}

export interface AutocompleteOptions {
  types?: string[]
  componentRestrictions?: { country: string | string[] }
  fields?: string[]
}

export interface GooglePlaceResult {
  address_components?: AddressComponent[]
  formatted_address?: string
  geometry?: {
    location: GoogleLatLng
  }
}

export interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export interface GoogleLatLng {
  lat(): number
  lng(): number
}
