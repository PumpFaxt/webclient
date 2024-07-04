import pumpItFaxtInterface from "./pumpItFaxtInterface";
import frax from "./frax";
import token from "./token";
import usernameRental from "./usernameRental";

const contractDefinitions = { frax, pumpItFaxtInterface, token, usernameRental } as const;

export default contractDefinitions;
