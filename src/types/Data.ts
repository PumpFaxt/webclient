import { Address } from "viem";

export interface custom {}

export interface Token {
  address: Address;
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
