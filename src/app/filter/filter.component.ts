import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Pipe} from '@angular/core';
import {GoodsService} from '../shared/goods.service';
import {until} from 'selenium-webdriver';
import elementIsEnabled = until.elementIsEnabled;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
  @Output() filterValue = new EventEmitter<any>();
  minPrice = 0;
  maxPrice = 1600000;
  staticMax: number;
  staticMin: number;
  color = 'all';
  feature = 'all';

  constructor(private goodsService: GoodsService) {
  }

  ngOnInit() {
    this.filterForm = new FormGroup({
      'min': new FormControl([this.minPrice]),
      'max': new FormControl([this.maxPrice]),
      'color': new FormControl(null),
      'feature': new FormControl(null)
    });
    this.staticMin = this.goodsService.min;
    this.staticMax = this.goodsService.max;
  }

  pushChanges() {
    this.filterValue.emit({
      min: this.minPrice,
      max: this.maxPrice,
      color: this.color,
      feature: this.feature
    });
  }

  getMinPrice() {
    return this.staticMin;
  }
  getMaxPrice() {
    return this.staticMax;
  }

  resetColor() {
    console.log(this.filterForm.controls);
   // this.filterForm.controls.color.touched = false; // attempt to reset condition
  }

  checkTo() {
    if (this.minPrice >= this.maxPrice) {
      this.minPrice = this.maxPrice - 1;
    }
    this.pushChanges();
  }

  checkUntil() {
    if (this.maxPrice <= this.minPrice) {
      this.maxPrice = this.minPrice + 1;
    }
    this.pushChanges();
  }

}
