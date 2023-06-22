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
  tv: boolean;
  wifi: boolean;
  airCondition: boolean;
  availability: boolean;
  images: Image[];
  reviews: Review[];

  constructor() {
    this.images = [];
    this.reviews = [];
  }

}
