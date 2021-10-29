import { Navbar } from "./components/layout/Navbar";
import { Landing } from "./components/layout/Landing";
import "./App.css";
import { Fragment } from "react";

const App = () => (
  <Fragment>
   <Navbar />
   <Landing />
  </Fragment>
);

export default App;
