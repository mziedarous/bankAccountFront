import {Operation} from "./Operation";

export interface UserAccountDTO {
  id?: number;
  firstName?: string;
  lastName?: string;
  address?: string;
  amount?: number;
  compteReference?: string;

  operations?: Operation[];

}
