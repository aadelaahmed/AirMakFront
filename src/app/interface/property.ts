import { Review } from './review';
import { User } from './user';
import {Address} from "./address";
import {Image} from "./image";
export class Property {
  public id: number;
  public user: User;
  public address: Address;
  public propertyType: string;
  public listingType: string;
  public price: number;
  public description: string;
  public floorNo: number;
  public propertyNo: number;
  public bedRoomCount: number;
  public bathRoomCount: number;
  public airCondition: number;
  public tv: number;
  public availability: number;
  public publishDate: Date;
  public wifi: number;
  public images: Image[];
  public reviews: Review[];
  public propertyState:string;
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
