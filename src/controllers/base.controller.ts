export interface IJsonResponse<T> {
  status: number;
  data: T;
  errors: any;
}

export default class BaseController {
  jsonResponse<T>(
    data: T,
    status: number = 200,
    errors: any = []
  ): IJsonResponse<T> {
    return {
      status,
      data,
      errors,
    };
  }
}
