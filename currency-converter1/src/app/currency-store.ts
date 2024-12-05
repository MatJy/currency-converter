import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { computed } from '@angular/core';
import { Convertion } from './convertion';

// Initial state for the currency store
const initialState: Convertion = {
    from: '',
    to: '',
    amount: 0,
    rate: 0,
    outcome: 0,
};

export const CurrencyStore = signalStore(
    { providedIn: 'root' },

    withState(initialState),
    withComputed(({ amount, rate, from, to, outcome }) => ({
        conversionResult: computed(() => {
            return amount() * rate();
        }),
        getData: computed(() => {
            return {
                from: from(),
                to: to(),
                amount: amount(),
                rate: rate(),
                outcome: outcome(),
            };
        }),
    })),

    // methods to update the store
    withMethods(({ from, to, amount, outcome, rate, ...store }) => ({
        setFromCurrency(currency: string) {
            patchState(store, { from: currency });
        },
        setToCurrency(currency: string) {
            patchState(store, { to: currency });
        },
        setAmount(amount: number) {
            patchState(store, { amount: amount });
        },
        setRate(rate: number) {
            patchState(store, { rate: rate });
        },
        calculateOutcome(amount: number, rate: number) {
            patchState(store, { outcome: amount * rate });
        },
    }))
);
