import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController
  ) {}

  onRegister() {
    const userData = {
      username: this.username,
      password: this.password
    };
  
    this.authService.register(userData).subscribe(
      (response) => {
        if (response.status_register === 'berhasil') {
          this.authService.notifikasi('Pendaftaran berhasil!');
          this.navCtrl.navigateBack('/login'); // Redirect ke halaman login
        } else {
          this.authService.notifikasi(response.pesan || 'Pendaftaran gagal!');
        }
      },
      (error) => {
        console.error('Register error:', error);
        this.authService.notifikasi('Terjadi kesalahan, silakan coba lagi.');
      }
    );
  }
  
}
