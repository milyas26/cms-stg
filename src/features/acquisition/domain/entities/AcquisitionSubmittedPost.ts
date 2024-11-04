export class AcquisitionSubmittedPost {
  constructor(
    public _id: string = "",
    public acquisition: string = "",
    public publisher: string = "",
    public participant: string = "",
    public post: {
      coverCustom?: {
        backgroundColor: string;
        backgroundUrl: string;
        title: string;
        color: string;
      };
      _id: string;
      title: string;
      views: number;
      coverImage: string;
      id: string;
      isMonetized: boolean;
      monetizedBy: string;
    } = {
      coverCustom: {
        backgroundColor: "",
        backgroundUrl: "",
        title: "",
        color: "",
      },
      _id: "",
      title: "",
      views: 0,
      coverImage: "",
      id: "",
      isMonetized: false,
      monetizedBy: "",
    }
  ) {}
}
