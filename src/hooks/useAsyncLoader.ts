import { useRef, useState } from 'react';

type LoaderCache<R> = {
  resolved: boolean;
  rejected: boolean;
  promise?: Promise<R>;
  result?: R;
};

function getCacheKey(...args: unknown[]): string {
  try {
    return JSON.stringify(args);
  } catch (error) {
    return 'undefined';
  }
}

const baseCacheValue = {
  resolved: false,
  rejected: false,
  promise: undefined,
  result: undefined,
};

function useAsyncLoader<R, T extends Array<unknown>>(
  asyncMethod: (...args: T) => Promise<R>,
  afterResolve?: (result: R) => void,
  afterReject?: (error: unknown) => void
) {
  const storage = useRef(new Map<string, LoaderCache<R>>());
  const [, setRender] = useState(0);
  function forceRender() {
    setRender((p) => p + 1);
  }

  return {
    loader: (...args: Parameters<typeof asyncMethod>) => {
      const cacheKey = getCacheKey(...args);
      let loaderCache = storage.current.get(cacheKey);
      if (loaderCache?.rejected) return;

      if (loaderCache?.resolved) return loaderCache.result;

      if (loaderCache?.promise) {
        throw loaderCache.promise;
      }

      if (!storage.current.get(cacheKey)) {
        storage.current.set(cacheKey, baseCacheValue);
      }
      loaderCache = storage.current.get(cacheKey)!;
      forceRender();
      loaderCache.promise = asyncMethod(...args)
        .then((res) => {
          const loaderCache = storage.current.get(cacheKey);
          if (!loaderCache) {
            throw 'No loader cache';
          }
          loaderCache.promise = undefined;
          loaderCache.resolved = true;
          loaderCache.result = res;
          afterResolve?.(res);
          forceRender();
          return res;
        })
        .catch((error) => {
          const loaderCache = storage.current.get(cacheKey);
          if (!loaderCache) {
            throw 'No loader cache';
          }
          loaderCache.promise = undefined;
          loaderCache.rejected = true;
          afterReject?.(error);
          forceRender();
          return error;
        });

      throw loaderCache.promise;
    },
  };
}

export default useAsyncLoader;
