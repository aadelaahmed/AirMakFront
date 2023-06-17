import { Status } from "../enum/status";
import { ResponseError } from "../interface/responseerror";

export interface Response<T> {
  status: Status;
  payload: T;
  errors: ResponseError;
  metadata: any;
}
