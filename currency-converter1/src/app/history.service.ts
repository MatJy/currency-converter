import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Convertion } from './convertion';

@Injectable({
    providedIn: 'root',
})
export class HistoryService {
    private historySubject = new BehaviorSubject<Convertion[]>([]); // Start with an empty array
    history$ = this.historySubject.asObservable(); // Expose observable for components

    constructor() {}

    // Function to add a conversion to history
    addToHistory(conversion: Convertion) {
        const currentHistory = this.historySubject.value;
        this.historySubject.next([...currentHistory, conversion]); // Add new conversion
    }

    // clears history
    clearHistory() {
        this.historySubject.next([]);
    }
}
