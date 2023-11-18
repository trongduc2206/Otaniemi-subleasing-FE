import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AppRouter from "./AppRouter";
import './styles/app.css';


class App extends Component {
  render() {
    return (
      <>      
          <div className="Container">
            <AppRouter />
          </div>
        <Footer className="Footer" />
      </>
    );
  }
}

export default App;
