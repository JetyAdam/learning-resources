import React, { useState } from 'react';
import axios from 'axios';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

export const API_BASE = '/api/quickstarts/v1';
export const FAVORITES = '/favorites';

export type FavoriteQuickStart = {
  favorite: boolean;
  quickstartName: string;
};

async function toggleFavorite(quickstartName: string, favorite: boolean) {
  const chrome = useChrome();
  const [favorites, setFavorites] = useState<FavoriteQuickStart[]>([]);
  const originalFavorites = [...favorites];
  const newFavorites = favorites.filter(
    (f) => f.quickstartName !== quickstartName
  );
  if (favorite) {
    newFavorites.push({
      favorite,
      quickstartName,
    });
  }
  setFavorites(newFavorites);

  const user = await chrome.auth.getUser();
  if (!user) {
    throw new Error('User not logged in');
  }

  const account = user.identity.internal?.account_id;

  try {
    await axios.post(`${API_BASE}/${FAVORITES}?account=${account}`, {
      quickstartName,
      favorite,
    });
  } catch (error) {
    // rollback
    console.error('Failed to update favorites', error);
    setFavorites(originalFavorites);
  }
}

export default toggleFavorite;
