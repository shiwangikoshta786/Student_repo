
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Error from "../Pages/Error";

import Login from "../login";

import Custom from "../custom";
import  Portal from "../table";
import ProtectedRoute from "../ProtectedRoute";


export default function Index() {



  return (
    <BrowserRouter>
    <Switch>
       {/* <Route path="/" exact component={App}/> */}
        <Route exact path="/"  component={Login}/>
        <ProtectedRoute exact path="/detail" component={Custom} />
        <ProtectedRoute exact path="/table" component={Portal} />
        <Route path="*" component={Error } />
      </Switch>
    </BrowserRouter>
  );
}
