export interface Geo {
  lat: string
  lng: string
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo?: Geo
}

export interface Company {
  name: string
  catchPhrase?: string
  bs?: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: Address
  company: Company
}

export interface UserFormData {
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: Address
  company: Company
}

export interface ValidationErrors {
  [key: string]: string[]
}

export interface PlaceDetails {
  address_components: Array<{
    long_name: string
    short_name: string
    types: string[]
  }>
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
}
