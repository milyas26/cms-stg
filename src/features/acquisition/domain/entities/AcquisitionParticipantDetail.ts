export class AcquisitionParticipantDetail {
  constructor(
    public _id: string = "",
    public publisher: string = "",
    public participant: {
      _id: string;
      photoURL: string;
      totalLikes: number;
      totalPostView: number;
      totalFollowers: number;
      totalFollowing: number;
      fullName: string;
      username: string;
    } = {
      _id: "",
      photoURL: "",
      totalLikes: 0,
      totalPostView: 0,
      totalFollowers: 0,
      totalFollowing: 0,
      fullName: "",
      username: "",
    },
    public registerName: string = "",
    public registerEmail: string = "",
    public registerPhone: string = "",
    public registerDob: string = "",
    public occupation: string = ""
  ) {}
}
