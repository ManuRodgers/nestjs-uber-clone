export interface JwtModuleOptions {
  jwtAccessTokenSecret: string;
  expiresIn: string;
}
export interface JwtPayload {
  userId: string;
}
