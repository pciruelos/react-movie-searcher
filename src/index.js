import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import "bootswatch/dist/zephyr/bootstrap.min.css";

import List from "./containers/List";

const App = () => {
  return (
   <Fragment>
       <nav className="navbar navbar-dark bg-dark border-bottom border-black">
           <a href="/" className="navbar-brand mx-auto">
               Beatifull Movie & Series App Searcher
           </a>
           
       </nav>
        <main>
      <div className="container">
        <List />
      </div>
    </main>
   </Fragment>
  );
};

ReactDOM.render(<App/>, document.getElementById("root"));
