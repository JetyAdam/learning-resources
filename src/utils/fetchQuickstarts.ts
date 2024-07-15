import { ChromeAPI } from '@redhat-cloud-services/types';
import { API_BASE, FAVORITES, FavoriteQuickStart } from './toggleFavorite';
import { QUICKSTARTS } from '../hooks/useQuickStarts';
import axios from 'axios';
import { QuickStart } from '@patternfly/quickstarts';

// const fm = favorites.reduce<{ [key: string]: boolean }>((acc, curr) => {
//   acc[curr.quickstartName] = curr.favorite;
//   return acc;
// }, {});

// const foo: QuickStart[] = [
//   /**SPOUSTA VECOIIII */
// ];

// foo.forEach((q) => {
//   const isFavorite = fm[q.metadata.name];
//   if (isFavorite) {
//     q.metadata.favorite = true;
//   }
// });

async function fetchSuperQuickstarts(chrome: ChromeAPI, targetBundle?: string) {
  const user = await chrome.auth.getUser();
  if (!user) {
    throw new Error('User not logged in');
  }

  const account = user.identity.internal?.account_id;

  const quickstartsPath = `${API_BASE}/${QUICKSTARTS}`;

  const contentPromise = axios
    .get<{ data: { content: QuickStart }[] }>(quickstartsPath, {
      params: { account, bundle: targetBundle },
    })
    .then(({ data }) => {
      // `${account}`,
      return data.data.map(({ content }) => content);
    });

  const favoritesPromise = account
    ? axios
        .get<{ data: FavoriteQuickStart[] }>(
          `${API_BASE}/${FAVORITES}?account=${account}`,
          { params: { account } }
        )
        .then(({ data }) => data.data)
    : Promise.resolve<FavoriteQuickStart[]>([]);

  const [content, favorites] = await Promise.all([
    contentPromise,
    favoritesPromise,
  ]);

  const hashMap: { [key: string]: boolean } = {};

  favorites.forEach((item) => {
    hashMap[item.quickstartName] = item.favorite;
  });

  /**
   * Content
   * - pole quickstartu bez informance o favorite
   * [{
   *    metadata: {
   *       name: 'foo',
   *    },
   * ....
   * }]
   *
   * hasMape
   *  - objek kde vis kdery item z content je favorite
   * {
   *  'foo': true,
   *  'bar': false
   * }
   *
   * neco nam chybi
   * - Content obohaceny o informaci jestli item je favorite nebo ne
   */

  // v tom contentu musim zmenit data.metadata.favorite podle te hash mapy

  const enrichedContent = content.map((item) => {
    const name = item.metadata.name;
    return {
      ...item,
      metadata: {
        ...item.metadata,
        favorite: hashMap[name] || false,
      },
    };
  });

  return [enrichedContent, favorites];
}

export default fetchSuperQuickstarts;
