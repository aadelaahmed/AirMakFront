import { Review } from './review';
import { User } from './user';
import {Address} from "./address";
import {Image} from "./image";
export class Property {
  id: number;
  user: User;
  address: Address;
  propertyType: string;
  listingType: string;
  price: number;
  description: string;
  floorNo: number;
  propertyNo: number;
  bedRoomCount: number;
  bathRoomCount: number;
  airCondition: number;
  tv: number;
  availability: number;
  publishDate: Date;
  wifi: number;
  images: Image[];
  reviews: Review[];
  propertyState:string;
  constructor() {
    this.images = [];
    this.reviews = [];
  }

 /* public id: number;
  public user: User;
  public address: Address;
  public propertyType: string;
  public description: string;
  public price: number;
  public availability: number;
  public listingType: string;
  public floorNo: number;
  public wifi: number;
  public bedRoomCount: number;
  public bathRoomCount: number;
  public airCondition: number;
  public tv: number;
  public propertyNo: number;
  public images: Image[];
  public reviews: Review[];*/

}
