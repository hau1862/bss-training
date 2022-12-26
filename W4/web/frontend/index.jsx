import ReactDOM from "react-dom";

import App from "./App";

String.prototype.toCapitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

ReactDOM.render(<App />, document.getElementById("app"));
