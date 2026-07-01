import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

function getPortalRoot() {
  return document.getElementById('modal-root') ?? document.body;
}

export function usePortalRoot() {
  return useSyncExternalStore(subscribe, getPortalRoot, () => null);
}
