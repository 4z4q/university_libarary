import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Create a new ratelimiter, that allows 5 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1m"),
  analytics: false,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;
