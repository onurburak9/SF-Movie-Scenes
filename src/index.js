import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { ApiProvider } from "./components/state";

// import "./ReactotronConfig";
require("../style/sample.less");

ReactDOM.render(
	<ApiProvider>
		<App />
	</ApiProvider>,
	document.querySelector(".container-fluid")
);
