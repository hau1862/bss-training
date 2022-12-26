import { Card, SkeletonBodyText, Loading } from "@shopify/polaris";

export function LoadingMarkup(props) {
  return props.loading ? (
    <Card sectioned>
      <Loading />
      <SkeletonBodyText />
    </Card>
  ) : null;
}
