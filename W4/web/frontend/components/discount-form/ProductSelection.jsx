import {
  ResourceList,
  Thumbnail,
  ResourceItem,
  Filters,
} from "@shopify/polaris";
import { useContext } from "react";
import { DiscountContext } from "../../Discount";

export default function ProductSelection(props) {
  const { products, productIds, setModalActive } = useContext(DiscountContext);

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  function renderItem(product) {
    const { id, image, title } = product;
    const media = <Thumbnail source={image} alt={title} />;

    return (
      <ResourceItem id={id} media={media}>
        <div>{title}</div>
      </ResourceItem>
    );
  }

  const items =
    productIds?.length > 0
      ? products.filter((product) => {
          return productIds.includes(product.id);
        })
      : [];

  return (
    <ResourceList
      resourceName={resourceName}
      filterControl={
        <Filters
          queryValue={""}
          filters={[]}
          appliedFilters={[]}
          onQueryFocus={() => {
            setModalActive(true);
          }}
        />
      }
      items={items}
      renderItem={renderItem}
    />
  );
}
