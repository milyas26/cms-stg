export class FirebaseUser {
  constructor(
    public socialId: string,
    public idToken: string,
    public fullName: string,
    public photoUrl: string,
    public email: string
  ) {}
}
