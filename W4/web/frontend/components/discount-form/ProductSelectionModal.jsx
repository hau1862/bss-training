import {
  Card,
  Modal,
  ResourceList,
  Thumbnail,
  ResourceItem,
  Filters,
} from "@shopify/polaris";
import { useContext, useState } from "react";
import { DiscountContext } from "../../Discount";
import { useAuthenticatedFetch } from "../../hooks";

function mapProductDataFromResponse(response) {
  return response.body.data.products.nodes.map(
    ({
      id,
      title,
      tags,
      images: {
        nodes: [{ url: image }],
      },
      priceRange: {
        maxVariantPrice: { amount: price, currencyCode: currency },
      },
    }) => {
      return { id, title, tags, image, price, currency };
    }
  );
}

export default function ProductSelectionModal(props) {
  const {
    setProducts,
    products,
    productIds,
    setProductIds,
    modalActive,
    setModalActive,
    loading,
    setLoading,
  } = useContext(DiscountContext);
  const fetch = useAuthenticatedFetch();
  const [ids, setIds] = useState(productIds);
  const [queryValue, setQueryValue] = useState("");
  const resourceName = {
    singular: "product",
    plural: "products",
  };

  async function getProductByTitle(title) {
    setLoading(true);
    title = title === "" ? "" : `'*${title}*'`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    };
    const response = await fetch("/api/products/filter", options);
    const productData = await response.json();
    const products = mapProductDataFromResponse(productData);

    setProducts(products);
    setLoading(false);
  }

  function renderItem(product) {
    const { id, image, title, price } = product;
    const media = <Thumbnail source={image} alt={title} />;

    return (
      <ResourceItem
        id={id}
        url={`/product/${id}`}
        media={media}
        accessibilityLabel={`View details for ${title}`}
      >
        <div>
          {title} - {price}
        </div>
      </ResourceItem>
    );
  }

  function handleChange() {
    setProductIds(ids);
    setModalActive(!modalActive);
  }

  return (
    <Modal
      open={modalActive}
      onClose={handleChange}
      title="Select product will discount"
      primaryAction={{
        content: "Select",
        onAction: handleChange,
      }}
    >
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={products}
          loading={loading}
          filterControl={
            <Filters
              queryValue={queryValue}
              filters={[]}
              appliedFilters={[]}
              onQueryChange={(value) => {
                getProductByTitle(value);
                setQueryValue(value);
              }}
            />
          }
          renderItem={renderItem}
          selectedItems={ids}
          onSelectionChange={setIds}
          selectable
        />
      </Card>
    </Modal>
  );
}
