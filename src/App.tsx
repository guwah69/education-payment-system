import React from "react";
import { Shell } from "@ofqual/portal-client-shell";
import Authentication from "@ofqual/portal-auth";
import { moduleDefinition } from "./module";
import { Business, Home } from "@material-ui/icons";
import { UserType } from "@ofqual/portal-client-shell/dist/module/redux/state";
function App() {
  return (
    <Shell
      auth={
        process.env.REACT_APP_AUTH_TYPE === "DEV"
          ? Authentication.localAuthorization
          : Authentication.azureAuthorization
      }
      userDetails={Authentication.UserDetails}
      items={[
        {
          menuTitle: "Home",
          menuIcon: Home,
          pathOrUrl: "/",
          exactPathMatch: true,
          module: { component: () => <div>App Home</div>, redux: undefined },
          visibility: () => true,
        },
        {
          menuTitle: (user) =>
            user.userType === UserType.AO ? "My Organisation" : "Organisations",
          menuIcon: Business,
          pathOrUrl: "/organisations",
          module: moduleDefinition,
          visibility: () => true,
        },
      ]}
      toolbarItems={[]}
    />
  );
}

export default App;
