import { Card, DataTable, Thumbnail } from "@shopify/polaris";

export function SaleProducts(props) {
  const { saleProducts } = props;

  if (saleProducts.length > 0) {
    const rows = saleProducts.map((product) => {
      const media = <Thumbnail source={product.image} alt={product.title} />;
      return [
        media,
        product.title,
        product.price + " " + product.currency,
        product.currentPrice + " " + product.currency,
      ];
    });

    return (
      <Card>
        <div className="table-container">
          <DataTable
            columnContentTypes={["text", "text", "text", "text"]}
            headings={["", "Title", "Price", "Sale Price"]}
            rows={rows}
          />
        </div>
      </Card>
    );
  } else {
    return null;
  }
}
