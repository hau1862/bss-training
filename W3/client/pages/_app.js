import "../styles/globals.css";

String.prototype.toCapitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
