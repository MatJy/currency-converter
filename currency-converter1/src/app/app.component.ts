import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConverterComponent } from './converter/converter.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'currency-converter';
}
