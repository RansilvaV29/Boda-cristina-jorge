import { Component } from '@angular/core';

@Component({
  selector: 'app-event-details',
  imports: [],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
ngAfterViewInit() {
  const items = document.querySelectorAll('.event-item');
  items.forEach(item => {
    item.addEventListener('touchstart', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
    item.addEventListener('touchend', () => {
      setTimeout(() => item.classList.remove('active'), 400);
    });
  });
}
}
