import Redis from 'ioredis';
import 'dotenv/config';

const host = process.env.REDIS_HOST;
const port = Number(process.env.REDIS_PORT);
class Cache {
  redis: Redis.Redis;

  constructor() {
    this.redis = new Redis({
      host,
      port,
      keyPrefix: 'cache:',
    });
  }

  async get(key) {
    const value = await this.redis.get(key);

    return value ? JSON.parse(value) : null;
  }

  set(key, value, timeExp) {
    return this.redis.set(key, JSON.stringify(value), 'EX', timeExp);
  }

  del(key) {
    return this.redis.del(key);
  }

  async delPrefix(prefix) {
    const keys = await this.redis.keys(`cache:${prefix}:*`);
    const replaceKeys = keys.map(key => key.replace('cache:', ''));

    return this.redis.del(replaceKeys);
  }
}

export default new Cache();
