import Reactotron, { trackGlobalErrors } from "reactotron-react-js";
Reactotron.configure()
	.use(trackGlobalErrors({ offline: true })) // <--- here we go!
	.connect();
