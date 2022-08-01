export type TPolicyholder = {
  name: string;
  age: number;
  address: TAddress;
  phoneNumber: string;
  isPrimary: boolean;
};

export type TAddress = {
  line1: string;
  line2: string | undefined;
  city: string;
  state: string;
  postalCode: string;
};

export type TPolicyholderRowData = {
  [key in PolicyholderRowKeys]: string;
};

export type TResponseData = { policyHolders: TPolicyholder[] };

export enum PolicyholderRowKeys {
  name = 'Name',
  age = 'Age',
  address = 'Address',
  phoneNumber = 'Phone number',
  isPrimary = 'Primary policyholder?',
}
