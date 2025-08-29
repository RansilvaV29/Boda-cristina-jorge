import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { OurStoryComponent } from '../our-story/our-story.component';
import { EventDetailsComponent } from "../event-details/event-details.component";
import { PhotoGalleryComponent } from "../photo-gallery/photo-gallery.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, OurStoryComponent, EventDetailsComponent, PhotoGalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
countdown: string = '';

  ngOnInit() {
    const targetDate = new Date('2027-08-09T10:00:00').getTime();
    setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }
}
