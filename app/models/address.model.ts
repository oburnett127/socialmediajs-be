import { Model } from 'sequelize-typescript';

// @ts-ignore
export class Address extends Model {

    // @ts-ignore
    private street!: string;
  
    // @ts-ignore
    private city!: string;
  
    // @ts-ignore
    private state!: string;
  
    // @ts-ignore
    private postalCode!: string;
  
    // @ts-ignore
    private country!: string;
  
  }