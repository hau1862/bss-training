import { Card, EmptyState } from "@shopify/polaris";
import { useNavigate } from "@shopify/app-bridge-react";

export function EmptyStateMarkup(props) {
  const { loading, hasSaleProducts } = props;
  const navigate = useNavigate();
  const emptyStateImage =
    "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png";

  if (!loading && !hasSaleProducts) {
    return (
      <Card sectioned>
        <EmptyState
          heading="Create new discount for your product"
          action={{
            content: "Create discount",
            onAction: () => navigate("/discounts/new"),
          }}
          image={emptyStateImage}
        >
          <p>Allow store owner create new discount.</p>
        </EmptyState>
      </Card>
    );
  } else {
    return null;
  }
}
