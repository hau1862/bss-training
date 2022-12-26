import shopify from "./shopify.js";

import {
  readData,
  writeData,
  appendData,
  productPath,
  discountPath,
} from "./data/index.js";

const GET_ALL_PRODUCT = `
  query GetAllProduct {
    products(first: 10) {
      nodes {
        id
        title
        tags
        images(first: 1) {
          nodes {
            url
          }
        }
        variants(first: 1) {
          nodes {
            price
          }
        }
      }
    }
  }
`;

const GET_ALL_COLLECTION = `
  query GetAllCollection {
    collections(first: 10) {
      nodes {
        id
        title
        image {
          src
        }
        products(first: 10) {
          nodes {
            id
          }
        }
      }
    }
  }
`;

export default function applyApiEndpoint(app) {
  app.get("/api/products/all", async (_req, res) => {
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const data = await client.query({
      data: {
        query: GET_ALL_PRODUCT,
      },
    });

    res.status(200).json(data);
  });

  app.get("/api/collections/all", async (_req, res) => {
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const data = await client.query({
      data: {
        query: GET_ALL_COLLECTION,
      },
    });

    res.status(200).json(data);
  });
}
