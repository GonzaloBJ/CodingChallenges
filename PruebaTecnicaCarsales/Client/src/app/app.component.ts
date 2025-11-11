import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EpisodiosComponent } from "./episodios/episodios.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EpisodiosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Client';
}
