import { Address } from ".";

export interface custom {}


export interface token {
    address: Address;
    frax_amount: number;
    token_amount: number;
    market_cap: number;
    author: Address;
    timestamp: number;
    mint: Address;
    virtual_sol_reserves: number;
    virtual_token_reserves: number;
    tx_index: number;
    name: string;
    symbol: string;
    description: string;
    image_uri: string;
    twitter: string | null;
    telegram: string | null;
    bonding_curve: Address;
    associated_bonding_curve: Address;
    creator: Address;
    created_timestamp: number;
    raydium_pool: number | null;
    complete: boolean;
    total_supply: number;
    website: string | null;
    show_name: boolean;
    king_of_the_hill_timestamp: any;
    reply_count: number;
    last_reply: null;
    nsfw: boolean;
    market_id: null;
    inverted: null;
    username: string;
    profile_image: null;
    creator_username: string;
    creator_profile_image: null;
    usd_market_cap: number;
}