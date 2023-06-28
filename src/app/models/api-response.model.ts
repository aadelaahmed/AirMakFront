
import { Status } from "../enum/status";
import { ResponseError } from "../interface/responseerror";

export class APIResponse {
  status: Status;
  payload: any;
  errors: ResponseError;
  metadata: any;
}
