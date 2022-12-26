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
    products(first: 20) {
      nodes {
        id
        title
        tags
        images(first: 1) {
          nodes {
            url
          }
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

const GET_ALL_COLLECTION = `
  query GetAllCollection {
    collections(first: 20) {
      nodes {
        id
        title
        image {
          src
        }
        products(first: 20) {
          nodes {
            id
          }
        }
      }
    }
  }
`;

const GET_PRODUCT_WITH_FILTER = `
  query GetProductWithTitle($filter: String!) {
    products(first: 20, query: $filter) {
      nodes {
        id
        title
        tags
        images(first: 1) {
          nodes {
            url
          }
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
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

  app.post("/api/products/filter", async (req, res) => {
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const filterData = req.body;
    let filter = "";
    for (const key in filterData) {
      filter += `${key}: ${filterData[key]}`;
    }

    const data = await client.query({
      data: {
        query: GET_PRODUCT_WITH_FILTER,
        variables: {
          filter: filter,
        },
      },
    });

    res.status(200).json(data);
  });
}
