import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonCard,
  IonCardContent,
  IonProgressBar,
  IonFab,
  IonFabButton
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
    IonFab,
    IonFabButton,
    CommonModule
  ]
})
export class DashboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}