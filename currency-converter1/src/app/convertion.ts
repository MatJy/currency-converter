export interface Convertion {
  from: string; // from what currency we want to convert
  to: string; // to what currency we want the converion to be
  amount: number; // how much we want to convert
  rate: number; // what is selected currencys rate for one value
  outcome: number; // the calculated convertion "amount * rate"
}
