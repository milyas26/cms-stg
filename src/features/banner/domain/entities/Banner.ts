export class Banner {
  constructor(
    public id: string,
    public position: number,
    public bannerUrl: string,
    public targetUrl: string,
    public extra: { Key: string; Value: string }[],
    public targetType: string,
    public createdAt: string,
    public updatedAt: string
  ) {}
}
