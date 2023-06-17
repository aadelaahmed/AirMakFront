import { Address } from './Address';
import { Review } from './review';
import { User } from './user';
// @ts-ignore
import { Image } from './image';
export class Property {
  private id: number;
  private user: User;
  private address: Address;
  private propertyType: string;
  private description: string;
  private price: number;
  private availability: number;
  private listingType: string;
  private floorNo: number;
  private wifi: number;
  private bedRoomCount: number;
  private bathRoomCount: number;
  private airCondition: number;
  private tv: number;
  private propertyNo: number;
  private images: Image[];
  private reviews: Review[];

  constructor(
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
  }

  // Getters and setters
  // ...

  // Add additional methods or logic as needed
}
