import { DataTable, Card } from "@shopify/polaris";
import "./PricingDetail.css";
export function PricingDetail(props) {
  const data = localStorage.getItem("discounts");
  const discounts = data ? JSON.parse(data) : [];
  const rows =
    discounts.length > 0
      ? discounts.map((discount) => {
          return [
            discount.name,
            `${discount.decrease.option} - ${discount.decrease.amount}`,
            discount.status,
          ];
        })
      : [["empty", "empty", "empty"]];
  return (
    <Card>
      <div className="table-heading">Show product pricing details</div>
      <div className="table-container">
        <DataTable
          columnContentTypes={["text", "text", "text"]}
          headings={["Title", "Modified Price", "Status"]}
          rows={rows}
        />
      </div>
    </Card>
  );
}
