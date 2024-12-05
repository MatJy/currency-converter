import { CommonModule } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    effect,
    inject,
    OnInit,
} from '@angular/core';
import { CurrencyStore } from '../currency-store';
import { Convertion } from '../convertion';
import { HistoryService } from '../history.service';

@Component({
    selector: 'app-history',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './history.component.html',
    styleUrl: './history.component.css',
})
export class HistoryComponent {
    readonly cstore = inject(CurrencyStore);
    history: Convertion[] = [];

    private historyService = inject(HistoryService); // Inject the history service

    constructor() {
        // Subscribe to history updates
        this.historyService.history$.subscribe((updatedHistory) => {
            this.history = updatedHistory;
        });
    }

    // Function to add conversion data to history
    addToHistory() {
        const newConversion: Convertion = this.cstore.getData(); // Get conversion data from the store
        if (newConversion.amount > 0 && newConversion.rate > 0) {
            this.historyService.addToHistory(newConversion); // Add conversion to the history service
        }
    }

    // clears history
    clearHistory() {
        this.historyService.clearHistory();
    }
}
