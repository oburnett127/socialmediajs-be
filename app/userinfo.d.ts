declare module 'UserinfoModule' {
  export class Userinfo {
      id: number;
      email: string;
      password: string;
      firstName: string;
      lastName: string;

      constructor(id: number, email: string, password: string, firstName: string, lastName: string);

      static findByPk(pk: number | string): Promise<Userinfo | null>;
  }
}
