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
}
