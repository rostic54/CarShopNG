import { Component, OnInit } from '@angular/core';
import {Slider} from 'ngx-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public slider = new Slider();

  constructor() {
    this.slider.config.loop = true;
    this.slider.config.showPreview = false;
  }

  ngOnInit() {

    const slideItems = [
      {src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxqIDuIV73I3Q6sUoqrzvkqzsobuj5AHNQ6a9Js5QKL5lwUyQKug', title: 'Buggati'},
      {src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfzJ4lACX-oQXtODcQid3y3KXEIyhw5hmPlbwFLeJkc9-zu8j5', title: 'Ferrari'},
      {src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS89GjSRMLPZCcDNUdD7DvZ5cxXfQ27Rhr0DJ_EKY98r_NORSgn', title: 'Buggati'},
      {src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwnU8t3wMLel2st50_R3VDUtcQC-f9K4UeWg8Vw_g16CLEYQtE', title: 'Ford'},
      {src: 'http://bm.img.com.ua/berlin/storage/600x500/b/c7/9dc80292f041032dcfb4b9ed72c05c7b.jpg', title: 'Ferrari'}
    ];

    this.slider.items = slideItems;
  }
}
