import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.page.html',
  styleUrls: ['./campaigns.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonCardContent,
    CommonModule,
    FormsModule
  ]
})
export class CampaignsPage implements OnInit {

  campaigns = [
    {
      title: 'Vacinação contra Influenza',
      audience: 'Crianças de 6 meses a 5 anos',
      period: '01/05/2026 até 30/06/2026',
      icon: '💉'
    },
    {
      title: 'Campanha Tríplice Viral',
      audience: 'Crianças até 15 meses',
      period: '01/07/2026 até 31/08/2026',
      icon: '🩺'
    }
  ];

  constructor() { }

  ngOnInit() {}

}