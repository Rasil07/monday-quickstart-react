import React from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/

import { ItemView } from "./components";
import { ItemViewProvider } from "./contexts/item-view-form/context";

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
        <ItemViewProvider>
          <ItemView />
        </ItemViewProvider>
      </div>
    );
  }
}

export default App;
