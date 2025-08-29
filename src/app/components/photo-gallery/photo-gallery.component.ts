import imageCompression from 'browser-image-compression';
import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './photo-gallery.component.html',
  styleUrl: './photo-gallery.component.css'
})
export class PhotoGalleryComponent implements OnInit {
  goToWeb() {
    window.open('https://frontend-visorfotos.onrender.com/', '_blank');
  }
  downloadImage(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'foto-boda.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  photos: any[] = [];
  selectedFiles: File[] = [];
  uploadedBy: string = '';
  filterName: string = '';
  lightboxOpen: boolean = false;
  lightboxIndex: number = 0;
  uploadMessage: string = '';
  deleteMessage: string = '';
  isUploading: boolean = false;
  get uploaderNames(): string[] {
    const names = this.photos.map(p => p.uploadedBy).filter(n => !!n);
    return Array.from(new Set(names));
  }

  // Devuelve clases para el collage según el índice y tamaño de la foto
  getCollageClass(i: number, photo: any): string {
    // Puedes personalizar la lógica según tus datos
    // Ejemplo: alternar tamaños, o usar una propiedad photo.size
    if (photo.size === 'large') return 'collage-large';
    if (photo.size === 'medium') return 'collage-medium';
    if (photo.size === 'small') return 'collage-small';
    // Alternancia por índice si no hay size
    if (i % 7 === 0) return 'collage-large';
    if (i % 3 === 0) return 'collage-medium';
    return 'collage-small';
  }

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.getPhotos().subscribe(photos => this.photos = photos);
  }

  get filteredPhotos() {
    if (!this.filterName) return this.photos;
    return this.photos.filter(p => p.uploadedBy === this.filterName);
  }

  openLightbox(index: number) {
    this.lightboxIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox() {
    this.lightboxOpen = false;
  }

  prevPhoto() {
    if (this.lightboxIndex > 0) this.lightboxIndex--;
  }

  nextPhoto() {
    if (this.lightboxIndex < this.filteredPhotos.length - 1) this.lightboxIndex++;
  }

  async delete(photo: any) {
    try {
      await this.photoService.deletePhoto(photo);
      this.photos = this.photos.filter(p => p.url !== photo.url);
      this.deleteMessage = 'Foto eliminada exitosamente.';
    } catch (e) {
      this.deleteMessage = 'Error al eliminar la foto.';
    }
    setTimeout(() => this.deleteMessage = '', 3000);
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  async upload() {
    if (!this.uploadedBy || this.uploadedBy.trim().length === 0) {
      this.uploadMessage = 'Por favor ingresa tu nombre antes de subir fotos.';
      setTimeout(() => this.uploadMessage = '', 3000);
      return;
    }
    if (this.selectedFiles.length > 0) {
      this.isUploading = true;
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        };
        for (const file of this.selectedFiles) {
          const compressedFile = await imageCompression(file, options);
          const photo = await this.photoService.uploadPhoto(compressedFile, this.uploadedBy);
          this.photos.push(photo);
        }
        this.uploadMessage = 'Fotos subidas exitosamente.';
        this.selectedFiles = [];
        this.uploadedBy = '';
      } catch (e) {
        this.uploadMessage = 'Error al subir las fotos.';
      }
      setTimeout(() => this.uploadMessage = '', 3000);
      this.isUploading = false;
    }
  }
}
