import { Badge } from "./Badge";

export class User {
  constructor(
    public fullName: string,
    public username: string,
    public email: string,
    public photoURL: string,
    public phoneNumber: string,
    public dateOfBirth: string,
    public gender: string,
    public registrationStatus: string,
    public credential: string,
    public isVerified: boolean,
    public socialId: string,
    public biography: string,
    public totalLikes: number,
    public totalPostView: number,
    public totalFollowers: number,
    public totalFollowing: number,
    public badges: Badge[],
    public role: string,
    public isMonetizeProgramEnrolled: boolean,
    public isMonetized: boolean,
    public token: string,
    public refreshToken: string
  ) {}
}
