import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


import {
  IonContent,
  IonCard,
  IonCardContent,
  IonProgressBar,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonCardContent,
    IonProgressBar,
    IonButton,
    CommonModule,
    FormsModule
  ]
})
export class DashboardPage implements OnInit {

  selectedChild: any = null;

  menuOpen = false;

  searchTerm = '';

    children: any[] = [];
showChildModal = false;

newChild = {
  name: '',
  birthDate: '',
  gender: '',
  cardNumber: '',
  avatar: ''
};

  showVaccineModal = false;

  selectedVaccine = '';
  selectedDate = '';
  selectedUnit = '';
  selectedBatch = '';

  vaccines = [
    'BCG',
    'Hepatite B',
    'Pentavalente',
    'Poliomielite',
    'Rotavírus',
    'Pneumocócica 10',
    'Meningocócica C',
    'Febre Amarela',
    'Tríplice Viral',
    'Influenza',
    'COVID-19'
  ];

  constructor(
  private alertController: AlertController,
  private router: Router
) {}

ngOnInit() {

  const children =
    localStorage.getItem('children');

  if (children) {
    this.children = JSON.parse(children);
  }

  this.responsavelNome =
    localStorage.getItem('responsavelNome')
    || 'Responsável';
}

responsavelNome = '';

openChildModal() {
  this.showChildModal = true;
}

closeChildModal() {

  this.showChildModal = false;

  this.newChild = {
    name: '',
    birthDate: '',
    gender: '',
    cardNumber: '',
    avatar: '👶'
  };
}

saveChild() {

  if (
    !this.newChild.name ||
    !this.newChild.birthDate
  ) {
    return;
  }

  this.children.push({

  name: this.newChild.name,

  birthDate: this.formatDate(
    this.newChild.birthDate
  ),

  gender: this.newChild.gender,
  cardNumber: this.newChild.cardNumber,
  avatar: this.newChild.avatar,

  showDetails: false,
  isEditing: false,

  vaccinesApplied: [
      {
        name: 'BCG',
        date: '10/06/2023'
      },
      {
        name: 'Hepatite B',
        date: '10/06/2023'
      }
    ],

    vaccinesPending: [
      {
        name: 'Pentavalente',
        date: '15/08/2026'
      },
      {
        name: 'Poliomielite',
        date: '15/08/2026'
      }
    ],

    vaccinesLate: [
      {
        name: 'Influenza',
        date: '10/04/2026'
      }
    ]
  
});

  localStorage.setItem(
    'children',
    JSON.stringify(this.children)
  );

  this.closeChildModal();
}


  get filteredChildren() {
    return this.children.filter(child =>
      child.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  get totalPendingVaccines(): number {
    return this.children.reduce(
      (total, child) =>
        total + child.vaccinesPending.length,
      0
    );
  }

  get totalLateVaccines(): number {
    return this.children.reduce(
      (total, child) =>
        total + child.vaccinesLate.length,
      0
    );
  }

  get overallCoverage(): number {

    let applied = 0;
    let total = 0;

    this.children.forEach(child => {

      applied += child.vaccinesApplied.length;

      total +=
        child.vaccinesApplied.length +
        child.vaccinesPending.length +
        child.vaccinesLate.length;
    });

    return total
      ? Math.round((applied / total) * 100)
      : 100;
  }

  openVaccineModal(child: any) {

    this.selectedChild = child;

    this.showVaccineModal = true;
  }

  closeVaccineModal() {

    this.showVaccineModal = false;

    this.selectedChild = null;

    this.selectedVaccine = '';
    this.selectedDate = '';
    this.selectedUnit = '';
    this.selectedBatch = '';
  }

  coveragePercentage(child: any): number {

    const total =
      child.vaccinesApplied.length +
      child.vaccinesPending.length +
      child.vaccinesLate.length;

    if (total === 0) {
      return 100;
    }

    return Math.round(
      (child.vaccinesApplied.length / total) * 100
    );
  }

  progressValue(child: any): number {

    return this.coveragePercentage(child) / 100;
  }

  hasLateVaccines(child: any): boolean {

    return child.vaccinesLate.length > 0;
  }

  async saveVaccine() {

    if (
      !this.selectedVaccine ||
      !this.selectedDate ||
      !this.selectedChild
    ) {
      return;
    }

    const alreadyExists =
      this.selectedChild.vaccinesApplied.some(
        (vaccine: any) =>
          vaccine.name === this.selectedVaccine
      );

    if (!alreadyExists) {

      this.selectedChild.vaccinesApplied.push({
        name: this.selectedVaccine,
        date: this.formatDate(this.selectedDate),
        unit: this.selectedUnit,
        batch: this.selectedBatch
      });
    }

    this.selectedChild.vaccinesPending =
      this.selectedChild.vaccinesPending.filter(
        (vaccine: any) =>
          vaccine.name !== this.selectedVaccine
      );

    this.selectedChild.vaccinesLate =
      this.selectedChild.vaccinesLate.filter(
        (vaccine: any) =>
          vaccine.name !== this.selectedVaccine
      );

    await this.showSuccessMessage(
      this.selectedVaccine
    );

    this.closeVaccineModal();
  }

  async showSuccessMessage(vacina: string) {

    const alert = await this.alertController.create({
      header: '🎉 Vacina Registrada!',
      message: `${vacina} registrada com sucesso para ${this.selectedChild?.name}.`,
      buttons: ['OK']
    });

    await alert.present();
  }

  toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

goToProfile() {
  this.router.navigate(['/profile']);
}

goToCampaigns() {
  this.router.navigate(['/campaigns']);
}

logout() {
  this.router.navigate(['/login']);
}

  formatDate(date: string): string {

    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
  }

calculateAge(birthDate: string): number {

  if (!birthDate) {
    return 0;
  }

  let birth: Date;

  if (birthDate.includes('/')) {

    const [day, month, year] =
      birthDate.split('/');

    birth = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

  } else {

    birth = new Date(birthDate);
  }

  const today = new Date();

  let age =
    today.getFullYear() -
    birth.getFullYear();

  const monthDiff =
    today.getMonth() -
    birth.getMonth();

  if (
    monthDiff < 0 ||
    (
      monthDiff === 0 &&
      today.getDate() < birth.getDate()
    )
  ) {
    age--;
  }

  return age;
}

deleteChild(child: any) {

  this.children = this.children.filter(
    c => c !== child
  );

  localStorage.setItem(
    'children',
    JSON.stringify(this.children)
  );
}
}