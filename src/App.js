import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AppRouter from "./AppRouter";


class App extends Component {
  render() {
    return (
      <>
        <Header className="Header" />
        <div className="Container">
          <AppRouter />
        </div>
        <Footer className="Footer" />
      </>
    );
  }
}

export default App;
