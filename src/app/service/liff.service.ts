import { Injectable } from '@angular/core';
import liff from '@line/liff';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LiffService {
  constructor(private localStorageService: LocalStorageService) {}

  checkLiffLogin(): boolean {
    return !!this.localStorageService.getItem(
      'LIFF_USER_TOKEN_' + environment.liff_id
    );
  }

  async initLiff(): Promise<void> {
    if (!this.checkLiffLogin()) {
      try {
        await liff.init({ liffId: environment.liff_id });
        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          this.localStorageService.setItem(
            'LIFF_USER_TOKEN_' + environment.liff_id,
            JSON.stringify(profile)
          );
        } else {
          console.log('login First!');
          liff.login();
        }
      } catch (err) {
        console.error(err);
        this.localStorageService.removeItem(
          'LIFF_USER_TOKEN_' + environment.liff_id
        );
      }
    }
  }

  getProfile() {
    return JSON.parse(
      this.localStorageService.getItem(
        'LIFF_USER_TOKEN_' + environment.liff_id
      ) || '{}'
    );
  }

  logOutLiff() {
    try {
      console.log('before logout');
      console.log(this.getProfile());
      this.localStorageService.removeItem(
        'LIFF_USER_TOKEN_' + environment.liff_id
      );
      console.log('after logout');
      console.log(this.getProfile());

      // liff.logout();
    } catch (err) {
      console.log(err);
    }
  }
}
