import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import reducers from "./app/redux/reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import "semantic-ui-css/semantic.min.css";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
