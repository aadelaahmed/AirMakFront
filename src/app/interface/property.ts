import { Review } from './review';
import { User } from './user';
// @ts-ignore
import { Image } from './image';
import {Address} from "./address";
export class Property {
  public id: number;
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
  public reviews: Review[];

}
