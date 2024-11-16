export class Enrollment {
  constructor(
    public _id: string,
    public user: {
      _id: string;
      fullName: string;
      username: string;
      registrationStatus: string;
    },
    public post: {
      _id: string;
      title: string;
      views: number;
      bookmarks: number;
      likes: number;
      share: number;
      createdAt: string;
      updatedAt: string;
      coverImage: string;
      coverCustom?: {
        backgroundColor: string;
        backgroundUrl: string;
        color: string;
        title: string;
      };
      category: string;
    },
    public status: string,
    public reason: string,
    public approverEmail: string,
    public showStatus: boolean,
    public createdAt: string,
    public updatedAt: string,
    public __v: number
  ) {}
}
