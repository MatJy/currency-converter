import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { CurrencyStore } from './currency-store';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly cstore = inject(CurrencyStore);
  constructor(private http: HttpClient) {}

  fetchData() {
    const fromCurrency: string = this.cstore.from();
    const toCurrency: string = this.cstore.to();
    // Check if both currencies are set correctly
    if (fromCurrency.length === 3 && toCurrency.length === 3) {
      const url = `https://hexarate.paikama.co/api/rates/latest/${fromCurrency}?target=${toCurrency}`;
      this.http.get(url).subscribe((data: any) => {
        this.cstore.setRate(data.data.mid);
      });
    }
  }
}
