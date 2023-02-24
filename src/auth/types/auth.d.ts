export type JwtResponsePayload = {
  username: string;
  sub: string;
};

export type JwtRequestPayload = {
  username: string;
  userId: string;
};
