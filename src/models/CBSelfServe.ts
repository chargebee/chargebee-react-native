import { CBSelfServeParams } from '../interfaces/cb-types';

export class CBSelfServe {
  constructor(private props: CBSelfServeParams) {}

  build() {
    return this.baseUrl();
  }

  private baseUrl() {
    return `https://${this.props.site}.chargebeeportal.com/portal/v2`;
  }
}
