const statusOptions = [
  { label: "Enable", value: "enable" },
  { label: "Disable", value: "disable" },
];

const applyOptions = [
  {
    label: "All products",
    value: "all",
  },
  {
    label: "Specific products",
    value: "product",
  },
  {
    label: "Product collections",
    value: "collection",
  },
  {
    label: "Product Tags",
    value: "tag",
  },
];

const decreaseOptions = [
  { label: "Apply a price to selected products", value: "price" },
  {
    label:
      "Decrease a fixed amount of the original prices of selected products",
    value: "amount",
  },
  {
    label:
      "Decrease the original prices of selected products by a percentage (%)",
    value: "percent",
  },
];

const defaultData = {
  name: "",
  priority: 0,
  status: statusOptions[0].value,
  apply: applyOptions[0].value,
  decrease: {
    option: decreaseOptions[0].value,
    amount: 0,
  },
  productIds: [],
  collectionIds: [],
  tagIds: [],
};

export { statusOptions, applyOptions, decreaseOptions, defaultData };
