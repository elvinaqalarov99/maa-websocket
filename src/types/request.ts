type RequestType = "sending";

type Request = {
  type: RequestType;
  sort: string;
  page: number;
};

export { Request };
