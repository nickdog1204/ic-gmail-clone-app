import {Injectable} from '@angular/core';
import {LoadingController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {

  private loadingEl: HTMLIonLoadingElement;

  constructor(
    private loadingController: LoadingController
  ) {
  }

  presentLoadingListOfMailsLoadingIndicator() {
    return this.presentLoadingAsync('Loading List of mails');
  }


  async dismissLoadingAsync() {
    if (this.loadingEl) {
      const res = this.loadingEl.dismiss();
      this.loadingEl = undefined;
      return res;
    }
  }

  private async presentLoadingAsync(message: string) {
    if (this.loadingEl) {
      await this.dismissLoadingAsync();
    }
    this.loadingEl = await this.loadingController.create({
      message,
      keyboardClose: true
    });
    return this.loadingEl.present();

  }
}
