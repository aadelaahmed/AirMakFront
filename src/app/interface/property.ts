import { Review } from './review';
import { User } from './user';
import {Address} from "./address";
import {Image} from "./image";
export class Property {
  private _id: number;
  private _user: User;
  private _address: Address;
  private _propertyType: string;
  private _description: string;
  private _price: number;
  private _availability: number;
  private _listingType: string;
  private _floorNo: number;
  private _wifi: number;
  private _bedRoomCount: number;
  private _bathRoomCount: number;
  private _airCondition: number;
  private _tv: number;
  private _propertyNo: number;
  private _images: Image[];
  private _reviews: Review[];

  /*constructor(
    id: number,
    user: User,
    address: Address,
    propertyType: string,
    description: string,
    price: number,
    availability: number,
    listingType: string,
    floorNo: number,
    wifi: number,
    bedRoomCount: number,
    bathRoomCount: number,
    airCondition: number,
    tv: number,
    propertyNo: number,
    images: Image[],
    reviews: Review[]
  ) {
    this.id = id;
    this.user = user;
    this.address = address;
    this.propertyType = propertyType;
    this.description = description;
    this.price = price;
    this.availability = availability;
    this.listingType = listingType;
    this.floorNo = floorNo;
    this.wifi = wifi;
    this.bedRoomCount = bedRoomCount;
    this.bathRoomCount = bathRoomCount;
    this.airCondition = airCondition;
    this.tv = tv;
    this.propertyNo = propertyNo;
    this.images = images;
    this.reviews = reviews;
  }*/

  // Getters and setters
  // ...

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get address(): Address {
    return this._address;
  }

  set address(value: Address) {
    this._address = value;
  }

  get propertyType(): string {
    return this._propertyType;
  }

  set propertyType(value: string) {
    this._propertyType = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get availability(): number {
    return this._availability;
  }

  set availability(value: number) {
    this._availability = value;
  }

  get listingType(): string {
    return this._listingType;
  }

  set listingType(value: string) {
    this._listingType = value;
  }

  get floorNo(): number {
    return this._floorNo;
  }

  set floorNo(value: number) {
    this._floorNo = value;
  }

  get wifi(): number {
    return this._wifi;
  }

  set wifi(value: number) {
    this._wifi = value;
  }

  get bedRoomCount(): number {
    return this._bedRoomCount;
  }

  set bedRoomCount(value: number) {
    this._bedRoomCount = value;
  }

  get bathRoomCount(): number {
    return this._bathRoomCount;
  }

  set bathRoomCount(value: number) {
    this._bathRoomCount = value;
  }

  get airCondition(): number {
    return this._airCondition;
  }

  set airCondition(value: number) {
    this._airCondition = value;
  }

  get tv(): number {
    return this._tv;
  }

  set tv(value: number) {
    this._tv = value;
  }

  get propertyNo(): number {
    return this._propertyNo;
  }

  set propertyNo(value: number) {
    this._propertyNo = value;
  }

  get image(): Image[] {
    return this._images;
  }

  set images(value: []) {
    this._images = value;
  }

  get reviews(): Review[] {
    return this._reviews;
  }

  set reviews(value: Review[]) {
    this._reviews = value;
  }

// Add additional methods or logic as needed
}
