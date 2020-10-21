import React from "react";
import { createPortal } from "react-dom";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { AuthContext, useAuth } from "./context/Auth";

function PrivateRoute({ component: Component, render, props, ...rest }) {
  const { existingTokens } = useAuth();
  console.log('existingTokens', existingTokens);

  function NewRoute() {
    if (existingTokens && existingTokens !== "") {
      console.log('render', render);
      if (render !== undefined) {
        return <Route {...rest} render={render} />
      } else {
        return <Route {...rest} render={(props) => <Component {...props} {...rest} /> } />
      }
    } else {
      return <Route render={(props) => <Redirect to="/login" />} />
    }
  }

  return (

    <NewRoute />

    // <Route
    //   {...rest}
    //   render={(props) =>
    //     existingTokens ? (
    //           <Component {...props} />
    //        ) : (
    //         <Redirect to="/login" />
    //        )
    //   }
    // />
  );
}

// class PrivateRoute extends Route {

//   render() {
//         console.log('privateroute', this);
//         return (
//           <Route render={(props) => {
//             if (this.context.existingTokens) {

//               if (this.props.render) {
//                 return this.props.render(props);

//               } else {
//                 return React.createElement(this.props.component);
//               }
//             } else {
//               console.log('on log le retour', this.context);
//                return <Redirect to="/login" />
//             }
//           }
//         } />
//       )
//   }
// }

export default PrivateRoute;
