import { Addon } from '../interfaces/cb-types';
import { BaseBuilder } from './BaseBuilder';
import { UrlTransformer } from '../helpers/UrlTransformer';

export class AddonsBuilder extends BaseBuilder {
  constructor(private addons: Addon[], private keyName: string) {
    super();
  }

  toUrl() {
    const values = this.mapArrayAttributes(this.addons);
    return UrlTransformer.encodeArrayOfObjects(this.keyName, values);
  }

  protected getAttributeMap(): { [p: string]: string } {
    return {
      id: 'id',
      quantity: 'quantity',
    };
  }
}
