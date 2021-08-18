import { Item } from '../interfaces/cb-types';
import { BaseBuilder } from './BaseBuilder';
import { UrlTransformer } from '../helpers/UrlTransformer';

export class ItemsBuilder extends BaseBuilder {
  constructor(private items: Item[], private keyName: string) {
    super();
  }

  toUrl() {
    const values = this.mapArrayAttributes(this.items);
    return UrlTransformer.encodeArrayOfObjects(this.keyName, values);
  }

  protected getAttributeMap(): { [p: string]: string } {
    return {
      planPricePointId: 'item_price_id',
      quantity: 'quantity',
    };
  }
}
