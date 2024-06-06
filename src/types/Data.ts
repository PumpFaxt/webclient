import { Address } from ".";

export interface custom {}

export interface token {
  address: Address;
  author: Address;
  author_username: string | null;
  author_profile_image: null;
  name: string;
  symbol: string;
  image_url: string;
  description: string;
  total_supply: number;
  frax_amount: number;
  token_amount: number;
  market_cap: number;
  createdAt: number;
  twitter: string | null;
  telegram: string | null;
  website: string | null;
  bonding_curve: Address;
  usd_market_cap: number;
  hall_of_fame: boolean;
  king_of_the_hill_timestamp: any;
  reply_count: number;
  last_reply: null;
  nsfw: boolean;
  hidden: boolean;
}
