import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import * as Actions from "./redux/actions";

function configureStore() {
 return createStore(rootReducer, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
const store = configureStore();
store.subscribe(() => {
 store.getState();
});
ReactDOM.render(
 <Provider store={store}>
  <App />
 </Provider>,
 document.getElementById("root")
);