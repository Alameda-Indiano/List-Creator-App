import React from "react";

import { Provider } from "react-redux";
import Store from "./Store";

import { ProviderAlertTemplate } from "./Context/Alert_Template";
import { ProviderExitHome } from "./Context/Exit_Home";
import RoutesProject from "./routes";

export const App = () => {
  return (
    <Provider store={ Store } >
      <ProviderAlertTemplate>
        <ProviderExitHome>
          <RoutesProject/>
        </ProviderExitHome>
      </ProviderAlertTemplate>
    </Provider>
  );
};