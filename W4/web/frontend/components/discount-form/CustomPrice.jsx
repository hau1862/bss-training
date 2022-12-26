import {
  Card,
  TextField,
  ChoiceList,
  FormLayout,
  InlineError,
} from "@shopify/polaris";
import { useContext } from "react";
import { decreaseOptions } from "../../commons/data";
import { validateDecrease } from "../../commons/validates";
import { DiscountContext } from "../../Discount";

export function CustomPrice(props) {
  const { decrease, setDecrease } = useContext(DiscountContext);

  return (
    <Card title="Custom Prices" sectioned>
      <FormLayout>
        <ChoiceList
          choices={decreaseOptions}
          selected={[decrease.option]}
          onChange={(array) => {
            const newDecrease = { ...decrease, option: array[0] };
            setDecrease(newDecrease);
          }}
        />
        <TextField
          label="Amount"
          type="number"
          id="decrease"
          error={!validateDecrease(decrease)}
          value={decrease.amount}
          onChange={(value) => {
            const newDecrease = { ...decrease, amount: Number(value) };
            setDecrease(newDecrease);
          }}
        />
        <InlineError
          message={
            !validateDecrease(decrease) ? "Decrease amount is wrong" : ""
          }
          fieldId="decrease"
        />
      </FormLayout>
    </Card>
  );
}
