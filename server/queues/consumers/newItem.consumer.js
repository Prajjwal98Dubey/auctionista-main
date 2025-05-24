import { Worker } from "bullmq";
import { cacheCleanByPattern } from "../queueFunctions.js";
import { syncProducts, syncUsers } from "../../search/syncElasticPostgresql.js";

const connection = {
  host: "localhost",
  port: 6379,
};

const mapElasticSearchQueryStringToType = {
  people: "users",
  product: "products",
};

const cacheCleaningWorker = new Worker(
  "cache-cleaner",
  async (job) => {
    // TODO: 1. clean the search cache 2. delete tbe elastic search query 3. sync new items in elastic search
    try {
      await cacheCleanByPattern("search:*");
      await fetch(
        `http://localhost:9200/${
          mapElasticSearchQueryStringToType[job.data.type]
        }/_delete_by_query`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            query: {
              match_all: {},
            },
          }),
        }
      );
      job.data.type == "people" ? await syncUsers() : await syncProducts();
    } catch (error) {
      console.log(error);
    }
  },
  {
    connection,
    autorun: false,
  }
);

cacheCleaningWorker.run();
