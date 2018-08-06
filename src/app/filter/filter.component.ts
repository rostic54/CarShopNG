import {Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {GoodsService} from '../shared/services/goods.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  subscribe: Subscription;
  @Output() filterValue = new EventEmitter<any>();
  minPrice = 0;
  maxPrice = 0;
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
    this.subscribe = this.goodsService.priceLimit.subscribe(
      priceLimit => {
        if (priceLimit) {
          this.minPrice = this.staticMin = priceLimit.minPrice;
          this.maxPrice = this.staticMax = priceLimit.maxPrice;
        }
      }
    );
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

  checkLowPrice() {
    if (this.minPrice >= this.maxPrice) {
      this.minPrice = this.maxPrice - 1;
      console.log(this.minPrice);
    }
    this.pushChanges();
  }

  checkMAxPrice() {
    if (this.maxPrice <= this.minPrice) {
      this.maxPrice = this.minPrice + 1;
    }
    this.pushChanges();
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

}
