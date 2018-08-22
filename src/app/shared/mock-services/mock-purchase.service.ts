import {Product} from '@shared/models/goods.model';

export class MockPurchaseService {
  addProduct(product: Product) {}

  purchaseStatus(orderAmount: {amount: number, total: number}) {}

}
