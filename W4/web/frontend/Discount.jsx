import { useState, createContext, useEffect } from "react";
import { defaultData } from "./commons/data";
import { useAuthenticatedFetch } from "./hooks";
const DiscountContext = createContext();

function mapProductDataFromResponse(response) {
  return response.body.data.products.nodes.map(
    ({
      id,
      title,
      tags,
      images: {
        nodes: [{ url: image }],
      },
      variants: {
        nodes: [{ price }],
      },
    }) => {
      return { id, title, tags, image, price };
    }
  );
}

function mapCollectionDataFromResponse(response) {
  return response.body.data.collections.nodes.map(
    ({ id, title, products: { nodes: products } }) => {
      const productIds = products.map((products) => products.id);
      return { id, title, productIds };
    }
  );
}

function getTagsFromProducts(products) {
  return products.reduce((accumulate, currentProduct) => {
    currentProduct.tags.forEach((tag) => {
      if (!accumulate.includes(tag)) {
        accumulate.push(tag);
      }
    });
    return accumulate;
  }, []);
}

function DiscountProvider(props) {
  const fetch = useAuthenticatedFetch();

  const [name, setName] = useState(defaultData.name);
  const [priority, setPriority] = useState(defaultData.priority);
  const [status, setStatus] = useState(defaultData.status);
  const [apply, setApply] = useState(defaultData.apply);
  const [decrease, setDecrease] = useState(defaultData.decrease);

  // all
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [tags, setTags] = useState([]);

  // selected
  const [productIds, setProductIds] = useState(defaultData.productIds);
  const [collectionIds, setCollectionIds] = useState(defaultData.collectionIds);
  const [tagIds, setTagIds] = useState(defaultData.tagIds);

  const [modalActive, setModalActive] = useState(
    defaultData.apply === "product"
  );
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const productResponse = await fetch("/api/products/all");

    if (productResponse.ok) {
      const productData = await productResponse.json();
      const products = mapProductDataFromResponse(productData);

      setProducts(products);
      setTags(getTagsFromProducts(products));
    } else {
      console.log("error");
    }

    const collectionResponse = await fetch("/api/collections/all");

    if (collectionResponse.ok) {
      const collectionData = await collectionResponse.json();
      const collections = mapCollectionDataFromResponse(collectionData);
      setCollections(collections);
    } else {
      console.log("error");
    }
  }, []);

  function getCurrentData() {
    return {
      name,
      priority,
      status,
      apply,
      decrease,
      productIds,
      collectionIds,
      tagIds,
    };
  }

  function setCurrentData({
    name,
    priority,
    status,
    apply,
    decrease,
    productIds,
    collectionIds,
    tagIds,
  }) {
    setName(name);
    setPriority(priority);
    setStatus(status);
    setApply(apply);
    setDecrease(decrease);
    setProductIds(productIds);
    setCollectionIds(collectionIds);
    setTagIds(tagIds);
  }

  return (
    <DiscountContext.Provider
      value={{
        name,
        setName,
        priority,
        setPriority,
        status,
        setStatus,
        apply,
        setApply,
        decrease,
        setDecrease,
        products,
        collections,
        tags,
        setProducts,
        setCollections,
        setTags,
        productIds,
        setProductIds,
        collectionIds,
        setCollectionIds,
        tagIds,
        setTagIds,
        getCurrentData,
        setCurrentData,
        modalActive,
        setModalActive,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </DiscountContext.Provider>
  );
}

export { DiscountContext, DiscountProvider };
