import {
  Card,
  FormLayout,
  TextField,
  InlineError,
  Select,
} from "@shopify/polaris";
import { useContext } from "react";
import { statusOptions } from "../../commons/data";
import {
  validateName,
  validatePriority,
  validateStatus,
} from "../../commons/validates";
import { DiscountContext } from "../../Discount";

export function GeneralInformation(props) {
  const { name, priority, status, setName, setPriority, setStatus } =
    useContext(DiscountContext);

  const validName = !props.submit && name === "" ? true : validateName(name);

  return (
    <Card title="General Information" sectioned>
      <FormLayout>
        <TextField
          label="Name"
          value={name}
          id="name"
          onChange={(value) => {
            setName(value);
          }}
          error={!validName}
        />
        <InlineError
          message={!validName ? "Name is required" : ""}
          fieldId="name"
        />
        <TextField
          label="Priority"
          value={priority}
          type="number"
          id="priority"
          error={!validatePriority(priority)}
          onChange={(value) => {
            setPriority(Number(value));
          }}
          helpText={
            validatePriority(priority)
              ? "Please enter an integer from 0 to 99 is the highest priority"
              : ""
          }
        />
        <InlineError
          message={
            !validatePriority(priority)
              ? "Priority is more than 0 and less than 99"
              : ""
          }
          fieldId="priority"
        />
        <Select
          label="Status"
          value={status}
          options={statusOptions}
          onChange={(value) => {
            setStatus(value);
          }}
          id="status"
          error={!validateStatus(status)}
        />
        <InlineError
          message={
            !validateStatus(status) ? "Status must be enable or disable" : ""
          }
          fieldId="status"
        />
      </FormLayout>
    </Card>
  );
}
