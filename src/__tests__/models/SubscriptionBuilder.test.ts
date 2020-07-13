import { CustomField, Subscription } from '../../interfaces/cb-types';
import { SubscriptionBuilder } from '../../models/SubscriptionBuilder';

describe('Subscription Builder', () => {
  let subscription: Subscription;
  beforeEach(() => {
    subscription = {
      planQuantity: 2,
      startDate: 1578727816,
    };
  });

  test('should prepare subscription details to url format', () => {
    const result = new SubscriptionBuilder(
      subscription,
      'subscription'
    ).toUrl();

    expect(result).toBe(
      'subscription[plan_quantity]=2&subscription[start_date]=1578727816'
    );
  });

  test('should include custom fields in subscription url', () => {
    const customField: CustomField = {
      name: 'cf_sub_test',
      value: 'professional',
    };
    subscription = { customFields: [customField] };

    const urlParams = new SubscriptionBuilder(
      subscription,
      'subscription'
    ).toUrl();
    expect(urlParams).toBe(
      `subscription[${customField.name}]=${customField.value}`
    );
  });
});
