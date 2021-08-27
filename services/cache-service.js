// https://medium.com/@danielsternlicht/caching-like-a-boss-in-nodejs-9bccbbc71b9b
const NodeCache = require('node-cache');

module.exports = class CacheService {

  constructor(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  get(key, storeFunction) {
    const value = this.cache.get(key);
    if (value) {
      console.log(`Retrieving ${key} from cache`);
      return Promise.resolve(value);
    }

    return storeFunction().then((result) => {
      this.cache.set(key, result);
      return result;
    });
  }

  delete(keys) {
    this.cache.del(keys);
  }

  flush() {
    this.cache.flushAll();
  }
};
