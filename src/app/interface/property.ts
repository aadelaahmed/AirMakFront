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

}
