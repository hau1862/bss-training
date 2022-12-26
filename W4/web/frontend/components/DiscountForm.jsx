import { Layout, Form, Button } from "@shopify/polaris";
import { useContext, useEffect } from "react";
import { validateData } from "../commons/validates";
import { GeneralInformation, ApplyProduct, CustomPrice } from "./discount-form";
import { defaultData } from "../commons/data";
import { DiscountContext } from "../Discount";
import { useNavigate } from "@shopify/app-bridge-react";

export function DiscountForm(props) {
  const navigate = useNavigate();
  const { getCurrentData, setCurrentData } = useContext(DiscountContext);
  const oldData = { ...defaultData, ...props.data };

  useEffect(() => {
    setCurrentData(oldData);
  }, []);

  function isDataChanged() {
    const newData = getCurrentData();
    return !(JSON.stringify(newData) === JSON.stringify(oldData));
  }

  async function handleSubmitForm(event) {
    event.preventDefault();

    const currentData = getCurrentData();
    if (isDataChanged() && validateData(currentData)) {
      const localData = localStorage.getItem("discounts");
      const discounts = localData ? JSON.parse(localData) : [];
      localStorage.setItem(
        "discounts",
        JSON.stringify(discounts.concat(currentData))
      );
      navigate("/");
    } else {
      event.target.reset();
      setCurrentData(oldData);
    }
  }

  return (
    <Layout>
      <Layout.Section>
        <Form onSubmit={handleSubmitForm}>
          <GeneralInformation />
          <ApplyProduct />
          <CustomPrice />
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              margin: "20px 0px 40px",
              color: "green",
            }}
          >
            <Button submit monochrome outline>
              Submit
            </Button>
          </div>
        </Form>
      </Layout.Section>
    </Layout>
  );
}
