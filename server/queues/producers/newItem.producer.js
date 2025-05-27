import { Queue } from "bullmq";

const connection = {
  host: "localhost",
  port: 6379,
};

// the job in this queue will be added when some new user registration (or new product is added) happens and the 'search' cache needs to be cleared !!! (till now only able to think of this approach for cache invalidaiton DATE: 24th May 2025, will do improvement)

const searchCacheCleaner = new Queue("cache-cleaner", { connection });

export const triggerCacheClean = async (type) => {
  await searchCacheCleaner.add(
    "search-cached-clean",
    {
      type,
    },
    {
      removeOnComplete: true,
      removeOnFail: true,
      removeDependencyOnFailure: true,
    }
  );
};
