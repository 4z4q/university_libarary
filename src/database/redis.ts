import config from "@/lib/config";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: config.env.upstash.redisUrl,
  token: config.env.upstash.redisToken,
});

// await redis.set("foo", "bar");
// const data = await redis.get("foo");

export default redis;