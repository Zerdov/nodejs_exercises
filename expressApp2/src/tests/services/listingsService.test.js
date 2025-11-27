import { getAllListings, searchListings } from '../../../services/listingsService.js';
import { Listing } from '../../../models/listingsModel.js';

jest.mock('../../models/listingsModel.js');

describe('listingsService', () => {
  beforeEach(() => {
    Listing.find.mockReset();
  });

  test('getAllListings retourne un tableau', async () => {
    const fakeData = [{ name: 'Test Listing' }];
    Listing.find.mockReturnValue({
      select: () => ({ limit: () => Promise.resolve(fakeData) }),
    });

    const results = await getAllListings(10);
    expect(results).toEqual(fakeData);
  });

  test('searchListings applique les filtres', async () => {
    const fakeData = [{ name: 'Filtered Listing' }];
    Listing.find.mockReturnValue({
      select: () => Promise.resolve(fakeData),
    });

    const results = await searchListings({ maxPrice: 100 });
    expect(results).toEqual(fakeData);
  });
});
