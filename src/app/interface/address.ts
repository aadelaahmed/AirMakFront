import { Property } from './property';

export class Address {
  private _id: number;
  private _street: string;
  private _city: string;
  private _streetNo: number;
  private _country: string;
  private _lng: number;
  private _lat: number;
  private _properties: Property[];

  // Constructors, getters, and setters

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get streetNo(): number {
    return this._streetNo;
  }

  set streetNo(value: number) {
    this._streetNo = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get lng(): number {
    return this._lng;
  }

  set lng(value: number) {
    this._lng = value;
  }

  get lat(): number {
    return this._lat;
  }

  set lat(value: number) {
    this._lat = value;
  }

  get properties(): Property[] {
    return this._properties;
  }

  set properties(value: Property[]) {
    this._properties = value;
  }
}

