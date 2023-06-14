type Req = {
  type: string;
  sort: string;
  page: number;
};

type Res = {
  payload: any;
  hasMore: boolean;
};

export { Req, Res };
