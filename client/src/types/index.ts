export type FormPreviousState =
  | {
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
