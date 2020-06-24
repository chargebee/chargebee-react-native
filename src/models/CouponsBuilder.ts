import { UrlTransformer } from '../helpers/UrlTransformer';
import { BaseBuilder } from './BaseBuilder';

export class CouponsBuilder extends BaseBuilder {
  constructor(private couponIds: string[], private keyName: string) {
    super();
  }

  toUrl() {
    return UrlTransformer.encodePlainArray(this.keyName, this.couponIds);
  }

  protected getAttributeMap(): { [p: string]: string } {
    return {};
  }
}
