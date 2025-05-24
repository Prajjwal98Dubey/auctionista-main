import { Client } from "@elastic/elasticsearch";

const esClient = new Client({ node: "http://localhost:9200" });
async function searchProducts(query) {
  const result = await esClient.search({
    index: "products",
    body: {
      query: {
        multi_match: {
          query,
          type: "phrase_prefix",
          fields: [
            "product_title",
            "product_desc",
            "product_appeal",
            "product_category",
          ],
        },
      },
    },
  });
  return result.hits.hits;
}

async function searchUsers(query) {
  const result = await esClient.search({
    index: "users",
    body: {
      query: {
        multi_match: {
          query,
          type: "phrase_prefix",
          fields: [
            "user_email",
            "user_name",
            "user_first_name",
            "user_last_name",
          ],
        },
      },
    },
  });
  return result.hits.hits;
}

export { searchProducts, searchUsers };
