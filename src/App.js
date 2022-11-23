import React from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/

import { ItemView } from "./components";

class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      settings: {
        text: "",
      },
      name: "",
    };
  }

  componentDidMount() {
    // TODO: set up event listeners
  }

  render() {
    return (
      <div className="App">
        <ItemView />
      </div>
    );
  }
}

export default App;
