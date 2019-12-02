import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import NavbarTop from "./components/Navbar/Navbar";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Visitors from "./components/Visitors/Visitors";
import * as axios from "axios";
import Footer from "./components/footer/footer";
import { Pagination } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";

let url = "http://localhost:5000/"; // development

const client = new ApolloClient({
  uri: `${url}graphql`
});

let filterList = [
  { attr: "", val: "Filter" },
  { attr: "today", val: "Today" },
  { attr: "yesterday", val: "Yesterday" },
  { attr: "week", val: "Last Week" },
  { attr: "month", val: "This month" }
];
let limitList = [
  { attr: "", val: "Limit" },
  { attr: "5", val: "5" },
  { attr: "10", val: "10" },
  { attr: "50", val: "50" }
];

function App() {
  let [filter, setFilter] = useState("");
  let [active, setActive] = useState(1);
  let [limit, setLimit] = useState(10);

  useEffect(() => {
    axios
      .get("https://jsonip.com")
      .then(ip => {
        axios.get(`${url}?ip=${ip.data.ip}`).then(data => console.log);
      })
      .catch(e => console.log(e));
  }, [filter, limit]);

  const onChange = event => {
    setFilter(event.target.value);
  };

  const onChangeLimit = event => {
    setLimit(event.target.value);
  };

  function changePage(item) {
    setActive(item);
  }

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <NavbarTop />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/service" render={() => {
                return (
                  <Fragment>
                  <select className="selectpicker" onChange={onChange}>
                  {filterList.map(item => {
                    return (
                      <option key={item.val} value={item.attr}>
                        {item.val}
                      </option>
                    );
                  })}
                </select>
                <select className="selectpicker" onChange={onChangeLimit}>
                  {limitList.map(item => {
                    return (
                      <option key={item.val} value={item.attr}>
                        {item.val}
                      </option>
                    );
                  })}
                </select>
                <Visitors filter={filter} limit={limit} skip={active} />
                <Pagination
                  size="sm"
                  style={{
                    float: "right",
                    marginRight: "2em",
                    cursor: "pointer"
                  }}
                >
                  {[1, 2, 3, 4, 5].map(item => {
                    return (
                      <Pagination.Item
                        onClick={() => changePage(item)}
                        key={item}
                        active={item === active}
                      >
                        {item}
                      </Pagination.Item>
                    );
                  })}
                </Pagination>
                </Fragment>
                )
            }} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
