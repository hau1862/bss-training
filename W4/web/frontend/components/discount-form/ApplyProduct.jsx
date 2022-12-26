import { Card, ChoiceList, FormLayout, InlineError } from "@shopify/polaris";
import { useState, useContext } from "react";
import { DiscountContext } from "../../Discount";
import { applyOptions } from "../../commons/data";
import { validateApply } from "../../commons/validates";
import ProductSelection from "./ProductSelection";
import CollectionSelection from "./CollectionSelection";
import TagSelection from "./TagSelection";
import ProductSelectionModal from "./ProductSelectionModal";

export function ApplyProduct(props) {
  const { apply, setApply, setModalActive } = useContext(DiscountContext);
  const [validState, setValidState] = useState({
    apply: true,
  });
  const options = applyOptions.map((item) => {
    switch (item.value) {
      case "product": {
        return {
          ...item,
          renderChildren: () => {
            return apply === "product" && <ProductSelection />;
          },
        };
      }
      case "collection": {
        return {
          ...item,
          renderChildren: () => {
            return apply === "collection" && <CollectionSelection />;
          },
        };
      }
      case "tag": {
        return {
          ...item,
          renderChildren: () => {
            return apply === "tag" && <TagSelection />;
          },
        };
      }
      case "all":
      default: {
        return item;
      }
    }
  });

  return (
    <Card title="Apply to Product" sectioned>
      <FormLayout>
        <ChoiceList
          choices={options}
          selected={[apply]}
          error={!validState.apply}
          id="apply"
          onChange={(array) => {
            const value = array[0];
            setApply(value);
            setModalActive(value === "product");
            setValidState({ ...validState, apply: validateApply(value) });
          }}
        />
        <InlineError
          message={!validState.apply ? "Apply value is wrong" : ""}
          fieldId="apply"
        />
      </FormLayout>
      <ProductSelectionModal />
    </Card>
  );
}
