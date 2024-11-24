export class Search {
  constructor(
    public users: {
      _id: string;
      fullName: string;
      username: string;
      email: string;
    }[],
    public post: {
      isMonetized: boolean;
      _id: string;
      title: string;
      author: {
        _id: string;
        username: string;
      };
    }[]
  ) {}
}
