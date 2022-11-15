import {Injectable} from '@angular/core';
import {Firestore} from '@angular/fire/firestore';
import {getDownloadURL, ref, Storage, uploadString} from '@angular/fire/storage';
import {Photo} from '@capacitor/camera';
import {AuthenticationService} from './authentication.service';
import {AlertController} from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private authService: AuthenticationService,
    private alertController: AlertController
  ) {}






  async uploadEventImage(name,cameraFile: Photo){
      const id= this.authService.getIdCurrentUser();
      let path = 'uploads/events/';
      if(!name){
        const now = new Date();
        name = now.toISOString();
      }
      path= path.concat(id,'/',name,'.png');
      const storageRef= ref(this.storage, path);
      try{
        await uploadString(storageRef, cameraFile.base64String,'base64');
        return await getDownloadURL(storageRef);
      } catch (e){
          const alert2 = await this.alertController.create({
            header: 'Error',
            subHeader: 'You have to add an image!',
            message: 'Try again',
            buttons: ['OK'],
          });
          await alert2.present();
          return null;
      }
  }

}
