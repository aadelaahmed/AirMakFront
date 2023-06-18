import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  constructor(private storage: AngularFireStorage) {}

  uploadFile(file: File): Observable<string> {
    // Generate a unique file name or use the original file name
    const fileName = `${Date.now()}_${file.name}`;

    // Get a reference to the storage path
    const storageRef = this.storage.ref(fileName);

    // Upload the file to the specified storage path
    const uploadTask = this.storage.upload(fileName, file);

    // Get the percentage changes of the upload progress
    const uploadPercentage = uploadTask.percentageChanges();

    // Subscribe to the upload progress and handle completion
    uploadTask.snapshotChanges().subscribe();

    // Return an Observable of the download URL
    return storageRef.getDownloadURL();
  }

  deleteFile(fileUrl: string): Observable<void> {
    // Get a reference to the file using its URL
    const storageRef = this.storage.refFromURL(fileUrl);

    // Delete the file
    return storageRef.delete();
  }
}
