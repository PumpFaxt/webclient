const address = "0xCC834d698E60D283Fa86d08Fd7726535339aC0B1" as const;

const abi = [
  {
    type: "constructor",
    stateMutability: "undefined",
    payable: false,
    inputs: [{ type: "address", name: "fraxAddress_" }],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ type: "address", name: "owner" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ type: "address", name: "account" }],
  },
  {
    type: "event",
    anonymous: false,
    name: "Launch",
    inputs: [
      { type: "address", name: "creator", indexed: true },
      { type: "address", name: "token", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "OwnershipTransferred",
    inputs: [
      { type: "address", name: "previousOwner", indexed: true },
      { type: "address", name: "newOwner", indexed: true },
    ],
  },
  {
    type: "function",
    name: "deployNewToken",
    constant: false,
    payable: false,
    inputs: [
      { type: "uint256", name: "initialSupply_" },
      { type: "string", name: "name_" },
      { type: "string", name: "symbol_" },
      { type: "string", name: "image_" },
    ],
    outputs: [{ type: "address", name: "" }],
  },
  {
    type: "function",
    name: "deploymentCharge",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "frax",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "address", name: "" }],
  },
  {
    type: "function",
    name: "isTokenValid",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "address", name: "addr_" }],
    outputs: [{ type: "bool", name: "" }],
  },
  {
    type: "function",
    name: "maximumInitialSupply",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "minimumInitialSupply",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "owner",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "address", name: "" }],
  },
  {
    type: "function",
    name: "renounceOwnership",
    constant: false,
    payable: false,
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "setDeploymentCharge",
    constant: false,
    payable: false,
    inputs: [{ type: "uint256", name: "newCharge_" }],
    outputs: [],
  },
  {
    type: "function",
    name: "setMaximumInitialTokenSupply",
    constant: false,
    payable: false,
    inputs: [{ type: "uint256", name: "newMaxium_" }],
    outputs: [],
  },
  {
    type: "function",
    name: "setMinimumInitialTokenSupply",
    constant: false,
    payable: false,
    inputs: [{ type: "uint256", name: "newMinimum_" }],
    outputs: [],
  },
  {
    type: "function",
    name: "transferOwnership",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "newOwner" }],
    outputs: [],
  },
  {
    type: "function",
    name: "withdraw",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "addr_" },
      { type: "uint256", name: "amount_" },
    ],
    outputs: [],
  },
] as const;

export default { address, abi };
