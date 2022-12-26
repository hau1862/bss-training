import { DataTable, Card } from "@shopify/polaris";
import "./PricingDetail.css";
import { useContext } from "react";
import { DiscountContext } from "../Discount";
import { calculateNewPrices } from "../commons/library";

export function PricingDetail(props) {
  const { products, collections, tags } = useContext(DiscountContext);
  const data = localStorage.getItem("discounts");
  const discounts = data ? JSON.parse(data) : [];
  const saleProducts = calculateNewPrices(
    products,
    collections,
    tags,
    discounts
  );

  const rows =
    saleProducts.length > 0
      ? saleProducts.map((product) => {
          const currentDiscount = discounts[product.currentDiscountIndex];
          let modifiedPrice = "";

          switch (currentDiscount.decrease.option) {
            case "price": {
              modifiedPrice =
                currentDiscount.decrease.amount + " " + product.currency;
              break;
            }
            case "amount": {
              modifiedPrice =
                "- " + currentDiscount.decrease.amount + " " + product.currency;
              break;
            }
            case "percent": {
              modifiedPrice = currentDiscount.decrease.amount + "%";
            }
            default: {
            }
          }

          return [product.title, currentDiscount.apply, modifiedPrice];
        })
      : [["empty", "empty", "empty"]];
  return (
    <Card>
      <div className="table-heading">Show product pricing details</div>
      <div className="table-container">
        <DataTable
          columnContentTypes={["text", "text", "text"]}
          headings={["Title", "Apply Option", "Modified Price"]}
          rows={rows}
        />
      </div>
    </Card>
  );
}
