import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductsService} from '../services/products.service';
import {Subscription} from 'rxjs';
import {CommonService} from '../services/common.service';

/**
 * @summary Filter component
 */
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
  /**
   * @summary Control-poUp component constructor
   * @param commonService - CommonService
   * @param productsService - Product Service
   */
  constructor(private productsService: ProductsService,
              private commonService: CommonService,) {
  }

  /**
   * @summary receiving max & min price of all products, calling initForm
   */
  ngOnInit() {
    this.subscribe = this.productsService.priceLimit.subscribe(
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

  /**
   * @summary form init & change a price if it isn't within limits min-max
   */
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

  /**
   * @summary rewriting filter dating
   */
  pushChanges() {
    this.productsService.getFilterCondition(this.filterForm.value);
  }

  /**
   * @summary logic clean
   */
  ngOnDestroy() {
    this.commonService.checkSubscription(this.subscribe);
  }

}
