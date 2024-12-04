import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-resep',
  templateUrl: './resep.page.html',
  styleUrls: ['./resep.page.scss'],
})
export class ResepPage implements OnInit {
  resepList: any[] = [];
  namaResep: string = '';
  langkahResep: string = '';
  selectedResep: any = null;

  constructor(
    private authService: AuthenticationService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getResep();
  }

  getResep() {
    this.authService.postMethod({}, 'tampil_resep.php').subscribe((res) => {
      this.resepList = res.data;
    });
  }

  addResep() {
    const data = {
      nama_resep: this.namaResep,
      langkah_resep: this.langkahResep,
    };
    this.authService.postMethod(data, 'tambah_resep.php').subscribe((res) => {
      if (res.status === 'success') {
        this.namaResep = '';
        this.langkahResep = '';
        this.getResep();
      } else {
        this.authService.notifikasi('Gagal menambahkan resep.');
      }
    });
  }

  editResep() {
    const data = {
      id_resep: this.selectedResep.id_resep,
      nama_resep: this.namaResep,
      langkah_resep: this.langkahResep,
    };
    this.authService.postMethod(data, 'edit_resep.php').subscribe((res) => {
      if (res.status === 'success') {
        this.namaResep = '';
        this.langkahResep = '';
        this.selectedResep = null;
        this.getResep();
      } else {
        this.authService.notifikasi('Gagal mengedit resep.');
      }
    });
  }

  async deleteResep(id: number) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus resep ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Hapus',
          handler: () => {
            this.authService
              .postMethod({ id_resep: id }, 'hapus_resep.php')
              .subscribe((res) => {
                if (res.status === 'success') {
                  this.getResep();
                } else {
                  this.authService.notifikasi('Gagal menghapus resep.');
                }
              });
          },
        },
      ],
    });

    await alert.present();
  }

  selectResep(resep: any) {
    this.selectedResep = resep;
    this.namaResep = resep.nama_resep;
    this.langkahResep = resep.langkah_resep;
  }

  cancelEdit() {
    this.selectedResep = null;
    this.namaResep = '';
    this.langkahResep = '';
  }

  isModalOpen = false;

  openAddResepModal() {
    this.isModalOpen = true;
    this.namaResep = '';
    this.langkahResep = '';
    this.selectedResep = null;
  }

  openEditResepModal(resep: any) {
    this.isModalOpen = true;
    this.selectedResep = resep;
    this.namaResep = resep.nama_resep;
    this.langkahResep = resep.langkah_resep;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveResep() {
    if (this.selectedResep) {
      this.editResep();
    } else {
      this.addResep();
    }
    this.closeModal();
  }
}
