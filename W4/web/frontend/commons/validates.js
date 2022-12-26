import {
  statusOptions,
  applyOptions,
  decreaseOptions,
  defaultData,
} from "./data";

function validateName(name) {
  return name && name.trim();
}

function validatePriority(priority) {
  return (
    !isNaN(priority) &&
    priority === parseInt(priority, 10) &&
    priority >= 0 &&
    priority <= 99
  );
}

function validateStatus(status) {
  return statusOptions.map((status) => status.value).includes(status);
}

function validateApply(apply) {
  return applyOptions.map((apply) => apply.value).includes(apply);
}

function validateDecrease({ option, amount }) {
  switch (option) {
    case "price": {
      return amount >= 0;
    }
    case "amount": {
      return amount >= 0;
    }
    case "percent": {
      return amount >= 0 && amount <= 100;
    }
    default: {
      return false;
    }
  }
}

function validateData(data = defaultData) {
  return (
    validateName(data.name) &&
    validatePriority(data.priority) &&
    validateStatus(data.status) &&
    validateApply(data.apply) &&
    validateDecrease(data.decrease)
  );
}

export {
  validateName,
  validatePriority,
  validateStatus,
  validateApply,
  validateDecrease,
  validateData,
};
