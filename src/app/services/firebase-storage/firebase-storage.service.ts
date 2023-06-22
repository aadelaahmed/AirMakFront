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
    const uploadTask = storageRef.put(file);

    // Get the percentage changes of the upload progress
    const uploadPercentage = uploadTask.percentageChanges();

    // Create a new Observable to handle the upload completion
    return new Observable<string>(observer => {
      // Subscribe to the upload progress
      uploadPercentage.subscribe(progress => {
        // You can handle the progress updates here if needed
        console.log(`Upload Progress: ${progress}%`);
      });

      // Handle the upload completion
      uploadTask.then(() => {
        // Get the download URL of the uploaded file
        storageRef.getDownloadURL().subscribe(downloadURL => {
          // Emit the download URL to the observer
          observer.next(downloadURL);
          observer.complete();
        });
      }).catch(error => {
        // Handle any errors that occur during the upload
        observer.error(error);
      });
    });
  }

  deleteFile(fileUrl: string): Observable<void> {
    // Get a reference to the file using its URL
    const storageRef = this.storage.refFromURL(fileUrl);

    // Delete the file
    return storageRef.delete();
  }
}
