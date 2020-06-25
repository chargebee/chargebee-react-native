import { CBCheckout } from '../../models/CBCheckout';

test('should generate a proper url for a simple plan', () => {
  const simplePlan = {
    planName: 'comics-box',
    site: 'honeycomics-v3-test',
  };
  const url = new CBCheckout(simplePlan).build();
  expect(url).toBe(
    'https://honeycomics-v3-test.chargebee.com/hosted_pages/plans/comics-box'
  );
});
