import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.page.html',
  styleUrls: ['./add-child.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonButton,
    CommonModule,
    FormsModule
  ]
})
export class AddChildPage implements OnInit {

  selectedGender = 'M';
  selectedAvatar = '🐼';

  childName = '';
  birthDate = '';
  cardNumber = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  clearForm() {
    this.childName = '';
    this.birthDate = '';
    this.cardNumber = '';

    this.selectedGender = 'M';
    this.selectedAvatar = '🐼';
  }

 async saveChild() {

  const alert = await this.alertController.create({
    header: '🎉 Sucesso!',
    message: `A criança ${this.childName} foi cadastrada com sucesso! \nDeseja cadastrar outra criança?`,
    buttons: [
      {
        text: '➕ Sim',
        handler: () => {
          this.clearForm();
        }
      },
      {
        text: '🏠 Painel de Controle',
        handler: () => {
          this.router.navigate(['/dashboard']);
        }
      }
    ]
  });

  await alert.present();
}
}