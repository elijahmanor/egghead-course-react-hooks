import React, { Component } from "react";
import TodoList from "./TodoExample/TodoList";
import Switch from "./Theme/Switch";
import { Helmet } from "react-helmet";
import ThemeContext from "./Theme/ThemeContext";
import styled from "react-emotion";

const Container = styled("div")`
  margin: 3em auto 1em auto;
  width: 75%;
  display: flex;
  justify-content: flex-end;
`;
const styles = {
  dark: `html {
  /* https://uigradients.com/#DarkOcean */
  background: #373b44; /* fallback for old browsers */
  background: -webkit-linear-gradient( to right, #4286f4, #373b44 ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient( to right, #4286f4, #373b44 ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}`,
  light: `html {
  /* https://uigradients.com/#SunnyDays */
  background: #EDE574;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #EDE574, #E1F5C4);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #EDE574, #E1F5C4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}`
};

export default class App extends Component {
  state = { theme: "dark" };
  componentDidMount() {
    const theme = window.localStorage.getItem("theme") || this.state.theme;
    this.setState({ theme });
  }
  handleThemeChange = flag => {
    const theme = flag ? "light" : "dark";
    this.setState({ theme });
    window.localStorage.setItem("theme", theme);
  };
  render() {
    const { theme } = this.state;
    return (
      <main>
        <Helmet>
          <style>{styles[theme]}</style>
        </Helmet>
        <ThemeContext.Provider value={theme}>
          <Container>
            <Switch
              checked={theme === "light"}
              onChange={this.handleThemeChange}
            />
          </Container>
          <TodoList />
        </ThemeContext.Provider>
      </main>
    );
  }
}
