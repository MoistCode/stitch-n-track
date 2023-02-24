export type JwtResponsePayload = {
  email: string;
  sub: string;
};

export type JwtRequestPayload = {
  email: string;
  userId: string;
};
