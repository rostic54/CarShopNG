import {Product} from '@shared/models/product.model';

export class MockPurchaseService {
  addProduct(product: Product) {}

  purchaseStatus(orderAmount: {amount: number, total: number}) {}

}
