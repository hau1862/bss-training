import { ResourceList, Thumbnail, ResourceItem } from "@shopify/polaris";
import { useContext } from "react";
import { DiscountContext } from "../../Discount";

export default function ProductSelection(props) {
  const { products, productIds } = useContext(DiscountContext);

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  function renderItem(product) {
    const { id, image, title } = product;
    const media = <Thumbnail source={image} alt={title} />;

    return (
      <ResourceItem id={id} url={`/product/${id}`} media={media}>
        <div>{title}</div>
      </ResourceItem>
    );
  }

  return (
    <ResourceList
      resourceName={resourceName}
      items={products.filter((product) => {
        return productIds.includes(product.id);
      })}
      renderItem={renderItem}
    />
  );
}
