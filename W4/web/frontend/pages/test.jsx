import { useAuthenticatedFetch } from "../hooks";

export default function Test(props) {
  const fetch = useAuthenticatedFetch();

  async function handleGetData() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "*18k*" }),
    };
    const response = await fetch("/api/products/filter", options);
    console.log(await response.json());
  }

  handleGetData();
  return <div></div>;
}
