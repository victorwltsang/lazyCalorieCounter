import React, { Component } from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./components/Main/Main";
import api from "./utils/api";
import sortByDate from "./utils/sortByDate";
import isLocalHost from "./utils/isLocalHost";
import { Router, Link } from "@reach/router";

export default class App extends Component {
  componentDidMount() {
    // Fetch all todos
    api.readAll().then(todos => {
      if (todos.message === "unauthorized") {
        if (isLocalHost()) {
          alert(
            "FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info"
          );
        } else {
          alert(
            "FaunaDB key is not unauthorized. Verify the key `FAUNADB_SECRET` set in Netlify enviroment variables is correct"
          );
        }
        return false;
      }

      console.log("all todos", todos);
      this.setState({
        todos: todos
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppHeader />
        <Main />
      </React.Fragment>
    );
  }
}
