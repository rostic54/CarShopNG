import {Goods} from '@shared/models/goods.model';

export class MockPurchaseService {
  addProduct(product: Goods) {}

  purchaseStatus(orderAmount: {amount: number, total: number}) {}

}
