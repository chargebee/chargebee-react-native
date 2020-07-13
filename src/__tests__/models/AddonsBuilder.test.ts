import { AddonsBuilder } from '../../models/AddonsBuilder';
import { Addon } from '../../interfaces/cb-types';

describe('Addons Builder', () => {
  test('should convert Addon details to url format', () => {
    const addons: Addon[] = [
      { id: 'cbdemo_setuphelp' },
      { id: 'cbdemo_support', quantity: 1 },
    ];
    const urlParams = new AddonsBuilder(addons, 'addons').toUrl();

    expect(urlParams).toBe(
      `addons[id][0]=${addons[0].id}&addons[id][1]=${addons[1].id}&addons[quantity][1]=${addons[1].quantity}`
    );
  });

  test('should return empty string when there are no addons', () => {
    const addons: Addon[] = [];
    const urlParams = new AddonsBuilder(addons, 'addons').toUrl();
    expect(urlParams).toBe('');
  });
});
