import { ItemsBuilder } from '../../models/ItemsBuilder';
import { Item } from '../../interfaces/cb-types';

describe('Items Builder', () => {
  test('should convert Item details to url format', () => {
    const items: Item[] = [
      { planPricePointId: 'HBProduct-USD-Monthly' },
      { planPricePointId: 'cbdemo_additional-analytics-USD-monthly', quantity: 1 },
    ];
    const urlParams = new ItemsBuilder(items, 'subscription_items').toUrl();

    expect(urlParams).toBe(
      `subscription_items[item_price_id][0]=${items[0].planPricePointId}&subscription_items[item_price_id][1]=${items[1].planPricePointId}&subscription_items[quantity][1]=${items[1].quantity}`
    );
  });

  test('should return empty string when there are no addons', () => {
    const items: Item[] = [];
    const urlParams = new ItemsBuilder(items, 'items').toUrl();
    expect(urlParams).toBe('');
  });
});
