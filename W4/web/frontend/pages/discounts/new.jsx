import { Page, Stack, Frame } from "@shopify/polaris";
import { DiscountForm, PricingDetail } from "../../components";

export default function NewDiscount() {
  const breadcrumbs = [{ content: "Discounts", url: "/" }];
  return (
    <Frame>
      <Page title="New Pricing Rule" divider breadcrumbs={breadcrumbs}>
        <Stack>
          <Stack.Item fill>
            <DiscountForm />
          </Stack.Item>
          <Stack.Item>
            <PricingDetail />
          </Stack.Item>
        </Stack>
      </Page>
    </Frame>
  );
}
