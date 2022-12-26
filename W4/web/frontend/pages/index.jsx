import { useNavigate } from "@shopify/app-bridge-react";
import { Frame, Layout, Page } from "@shopify/polaris";
import { useContext, useEffect, useState } from "react";
import { DiscountContext } from "../Discount";
import { calculateNewPrices } from "./../commons/library";
import { SaleProducts, LoadingMarkup, EmptyStateMarkup } from "../components";

export default function HomePage() {
  const navigate = useNavigate();
  const { products, tags, collections, loading, setLoading } =
    useContext(DiscountContext);

  const [saleProducts, setSaleProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    const discounts = JSON.parse(localStorage.getItem("discounts"));
    setSaleProducts(calculateNewPrices(products, collections, tags, discounts));
    setLoading(false);
  }, [products, tags, collections]);

  return (
    <Frame>
      <Page
        title="Discounts"
        primaryAction={{
          content: "Create discount",
          onAction: () => {
            navigate("/discounts/new");
          },
        }}
      >
        <Layout>
          <Layout.Section>
            <LoadingMarkup loading={loading} />
            <EmptyStateMarkup
              loading={loading}
              hasSaleProducts={saleProducts.length > 0}
            />
            <SaleProducts saleProducts={saleProducts} />
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
