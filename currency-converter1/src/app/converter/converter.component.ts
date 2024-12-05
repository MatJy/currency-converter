import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CurrencyStore } from '../currency-store';
import { DataService } from '../data.service';
import { HistoryComponent } from '../history/history.component';
import { HistoryService } from '../history.service';

@Component({
    selector: 'app-converter',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './converter.component.html',
    styleUrl: './converter.component.css',
})
export class ConverterComponent implements OnInit {
    readonly cstore = inject(CurrencyStore);
    private historyService = inject(HistoryService);
    /* 
  keeps the state of the convertion.
  changes when the convert button is clicked
  */
    isConverted: boolean = false;

    // all Currencies ISO codes
    // prettier-ignore
    currencyISOcodes: string[] = [
    "","AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
    "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
    "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
    "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP",
    "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS",
    "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
    "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
    "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT",
    "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
    "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
    "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
    "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
    "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SOS", "SRD", "SSP",
    "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD",
    "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES", "VND",
    "VUV", "WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"
  ];

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.cstore.calculateOutcome(this.cstore.amount(), this.cstore.rate());
    }

    // on call set the selected "from" value to store
    fromCurrencyChange(event: Event): void {
        const target = event.target as HTMLSelectElement;
        let previous: string = '';
        if (target.value !== previous) {
            this.isConverted = false;
        }
        previous = target.value;
        this.cstore.setFromCurrency(target.value);

        this.dataService.fetchData();
    }

    // on call set the selected "to" value to store
    toCurrencyChange(event: Event): void {
        const target = event.target as HTMLSelectElement;
        let previous: string = '';
        if (target.value !== previous) {
            this.isConverted = false;
        }
        this.cstore.setToCurrency(target.value);
        this.dataService.fetchData();
    }

    // on call send the selected amount to store
    amountChange(event: Event): void {
        /* 
    event parameter is the value of html field
    and on the target variable we treat it as HTMLInputElement
    then we can take the value of it which is a string
    */
        const target = event.target as HTMLInputElement;
        let previous: string = '';
        if (target.value !== previous) {
            this.isConverted = false;
        }
        const amount = parseFloat(target.value); // Convert the value to a number
        // we want the number to be positive
        if (amount >= 0) {
            this.cstore.setAmount(amount);
        } else {
        }
    }

    //    when called the outcome is calculated and the conversion text is shown
    //    also the history updates
    onConvert() {
        this.cstore.calculateOutcome(this.cstore.amount(), this.cstore.rate());
        const newConversion = this.cstore.getData(); // Get data from CurrencyStore
        this.isConverted = true;
        this.historyService.addToHistory(newConversion); // Add to history through the service
    }
}
