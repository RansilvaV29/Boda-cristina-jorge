import { Injectable } from '@angular/core';
import { storage, firestore } from '../firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, query, where, getDocs as getDocsFS, deleteDoc } from 'firebase/firestore';
import { deleteObject } from 'firebase/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  uploadMessage: string = ''; // Add this property to fix the error


  async uploadPhoto(file: File, uploadedBy: string): Promise<any> {
    const fileName = file.name; // Guardar el nombre original
    const filePath = `boda-cristina-jorge/${new Date().getTime()}_${fileName}`;
    const fileRef = ref(storage, filePath);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    const photo = { url, uploadedBy, createdAt: new Date(), filename: fileName };
    await addDoc(collection(firestore, 'photos'), photo);
    return photo;
  }

  async deletePhoto(photo: { url: string, uploadedBy: string }): Promise<void> {
    // Buscar el documento en Firestore por la URL
    const photosRef = collection(firestore, 'photos');
    const q = query(photosRef, where('url', '==', photo.url));
    const snapshot = await getDocsFS(q);
    for (const docSnap of snapshot.docs) {
      await deleteDoc(docSnap.ref);
    }
    // Eliminar el archivo de Storage
    const storageRef = ref(storage, photo.url);
    try {
      await deleteObject(storageRef);
    } catch (e) {
      // Si la URL no es el path, intentar extraer el path
      const urlParts = photo.url.split('/o/');
      if (urlParts.length > 1) {
        const path = decodeURIComponent(urlParts[1].split('?')[0]);
        const storageRef2 = ref(storage, path);
        await deleteObject(storageRef2);
      }
    }
  }

  getPhotos(): Observable<any[]> {
    return new Observable(observer => {
      getDocs(collection(firestore, 'photos')).then(snapshot => {
        const photos = snapshot.docs.map(doc => doc.data());
        observer.next(photos);
        observer.complete();
      });
    });
  }

  async downloadImage(url: string, filename: string = 'foto-boda.jpg') {
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error('Error al obtener la imagen');
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename; // Usar el nombre original del archivo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error al descargar la imagen:', error);
      this.uploadMessage = 'Error al descargar la imagen.';
      setTimeout(() => (this.uploadMessage = ''), 3000);
    }
  }


}