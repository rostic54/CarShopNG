import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductsService} from '../services/products.service';
import {Subscription} from 'rxjs';
import {CommonService} from '../services/common.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  subscribe: Subscription;
  minPrice = 0;
  maxPrice = 0;
  staticMax: number;
  staticMin: number;
  color = 'all';
  feature = 'all';

  constructor(private goodsService: ProductsService,
              private commonService: CommonService,) {
  }

  ngOnInit() {
    this.subscribe = this.goodsService.priceLimit.subscribe(
      priceLimit => {
        if (priceLimit) {
          this.minPrice = this.staticMin = priceLimit.minPrice;
          this.maxPrice = this.staticMax = priceLimit.maxPrice;
          this.initForm();
          this.pushChanges();
        }
      }
    );
    this.initForm();
  }

  initForm () {
    this.filterForm = new FormGroup({
      'min': new FormControl([this.minPrice]),
      'max': new FormControl([this.maxPrice]),
      'color': new FormControl(this.color),
      'feature': new FormControl(this.feature)
    });

    this.filterForm.valueChanges.subscribe(
      form => {
        const min = this.filterForm.controls['min'].value;
        if (min >= this.staticMax) {
          this.minPrice = this.staticMax - 1;
        } else {
          this.minPrice = min;
        }

        const max = this.filterForm.controls['max'].value;
        if (max <= this.staticMin) {
          this.maxPrice = this.staticMin + 1;
        } else {
          this.maxPrice = max;
        }

        this.pushChanges();
      }
    );
  }

  pushChanges() {
    this.goodsService.getFilterCondition(this.filterForm.value);
  }

  ngOnDestroy() {
    this.commonService.checkSubscription(this.subscribe);
  }

}
