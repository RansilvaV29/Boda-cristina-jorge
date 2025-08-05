import { Component } from '@angular/core';

@Component({
  selector: 'app-our-story',
  imports: [],
  templateUrl: './our-story.component.html',
  styleUrl: './our-story.component.css'
})
export class OurStoryComponent {
  ngAfterViewInit() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach(item => {
      // Para touchstart (activar)
      item.addEventListener('touchstart', () => {
        items.forEach(i => i.classList.remove('active')); // Solo uno activo
        item.classList.add('active');
      });
      // Para touchend (desactivar)
      item.addEventListener('touchend', () => {
        setTimeout(() => item.classList.remove('active'), 400); // Animación visible
      });
    });
  }
}
