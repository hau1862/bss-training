import {
  Card,
  Modal,
  ResourceList,
  Thumbnail,
  ResourceItem,
} from "@shopify/polaris";
import { useContext, useState } from "react";
import { DiscountContext } from "../../Discount";
import { useNavigate } from "@shopify/app-bridge-react";

export default function ProductSelectionModal(props) {
  const { products, productIds, setProductIds, modalActive, setModalActive } =
    useContext(DiscountContext);
  const [ids, setIds] = useState(productIds);

  const resourceName = {
    singular: "product",
    plural: "products",
  };

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
          renderItem={renderItem}
          selectedItems={ids}
          onSelectionChange={setIds}
          selectable
        />
      </Card>
    </Modal>
  );
}
