import { CouponsBuilder } from '../../models/CouponsBuilder';

describe('Coupon Builder', () => {
  test('should convert coupon details to url format', () => {
    const couponIds = ['One', 'Two', 'Three'];
    const urlParams = new CouponsBuilder(couponIds, 'coupons').toUrl();
    expect(urlParams).toBe(
      `coupons[0]=${couponIds[0]}&coupons[1]=${couponIds[1]}&coupons[2]=${couponIds[2]}`
    );
  });

  test('should return empty string when there are no coupons', () => {
    const couponIds: string[] = [];
    const urlParams = new CouponsBuilder(couponIds, 'coupons').toUrl();
    expect(urlParams).toBe('');
  });
});
