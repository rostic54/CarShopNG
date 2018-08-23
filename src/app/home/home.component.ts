import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

/**
 * @summary  Home Component
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('flyToRight', [
      state('inLeft', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('{{ start }}s ease-in')
      ], {params: {start: '0'}})
    ]),
    trigger('flyToLeft', [
      state('inRight', style({opacity: 1, transform: 'translateX(0) translateY(-38px)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('{{ start }}s ease-in')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  carList = ['http://bm.img.com.ua/berlin/storage/600x500/e/6f/328e4a870b03574ee83382e639a306fe.jpg',
    'https://img1.liveinternet.ru/images/attach/c/8/99/192/99192149_krasivuyy_kabriolet_Mercedesbens_300_SC_1.jpg',
    'https://img0.liveinternet.ru/images/attach/c/3/77/686/77686112_BMW_Z4_M_Roadster_E89_Hamann.jpg',
    'https://img0.liveinternet.ru/images/attach/c/10/110/335/110335138_avto_2.jpg',
    'https://img1.liveinternet.ru/images/attach/c/11/127/806/127806365_498w.jpg',
    'https://img1.liveinternet.ru/images/attach/c/0//52/498/52498038_audi_a7_sportback01.jpg'];

  ngOnInit() {
  }

}
