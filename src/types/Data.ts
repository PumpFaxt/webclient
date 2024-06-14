import { Address } from ".";

export interface custom {}

export interface Token {
  address: string;
  creator: string;
  name: string;
  symbol: string;
  totalSupply: number;
  description?: string;
  image: string;
  website?: string;
  telegram?: string;
  twitter?: string;
}
