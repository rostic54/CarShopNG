import {Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {GoodsService} from '../shared/services/goods.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CommonService} from '@shared/services/common.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  subscribe: Subscription;
  // @Output() filterValue = new EventEmitter<any>();
  minPrice;
  maxPrice;
  staticMax: number;
  staticMin: number;
  color = 'all';
  feature = 'all';

  // filterInfo = new BehaviorSubject(null);

  constructor(private goodsService: GoodsService,
              private commonService: CommonService) {
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
    if (this.filterForm.dirty) {
      this.commonService.getFilterCondition(this.filterForm.value);
    }
    // console.log(this.filterForm.value);
    // this.filterValue.emit({
    //   min: this.minPrice,
    //   max: this.maxPrice,
    //   color: this.color,
    //   feature: this.feature
    // });
  }

  checkLowPrice() {
    if (this.minPrice >= this.maxPrice) {
      this.minPrice = this.maxPrice - 1;
    }
    this.pushChanges();
  }

  checkMaxPrice() {
    if (this.maxPrice <= this.minPrice) {
      this.maxPrice = this.minPrice + 1;
    }
    this.pushChanges();
  }

  ngOnDestroy() {
    this.commonService.checkSubscription(this.subscribe);
  }

}
