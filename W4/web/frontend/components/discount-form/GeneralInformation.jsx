import {
  Card,
  FormLayout,
  TextField,
  InlineError,
  Select,
} from "@shopify/polaris";
import { useState, useContext } from "react";
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
  const [validState, setValidState] = useState({
    name: true,
    priority: true,
    status: true,
  });

  return (
    <Card title="General Information" sectioned>
      <FormLayout>
        <TextField
          label="Name"
          value={name}
          id="name"
          onChange={(value) => {
            setName(value);
            setValidState({ ...validState, name: validateName(value) });
          }}
          error={!validState.name}
        />
        <InlineError
          message={!validState.name ? "Name is required" : ""}
          fieldId="name"
        />
        <TextField
          label="Priority"
          value={priority}
          type="number"
          id="priority"
          error={!validState.priority}
          onChange={(value) => {
            setPriority(Number(value));
            setValidState({
              ...validState,
              priority: validatePriority(Number(value)),
            });
          }}
          helpText={
            validState.priority
              ? "Please enter an integer from 0 to 99 is the highest priority"
              : ""
          }
        />
        <InlineError
          message={
            !validState.priority
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
            setValidState({ ...validState, status: validateStatus(value) });
          }}
          id="status"
          error={!validState.status}
        />
        <InlineError
          message={!validState.status ? "Status must be enable or disable" : ""}
          fieldId="status"
        />
      </FormLayout>
    </Card>
  );
}
