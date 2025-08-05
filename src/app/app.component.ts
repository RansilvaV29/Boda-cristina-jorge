import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { OurStoryComponent } from "./components/our-story/our-story.component";
import { PhotoGalleryComponent } from "./components/photo-gallery/photo-gallery.component";
import { EventDetailsComponent } from "./components/event-details/event-details.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, OurStoryComponent, PhotoGalleryComponent, EventDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'boda-cristina-jorge';
}
