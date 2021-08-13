import reset from "styled-reset";
import { createGlobalStyle, GlobalStyleComponent } from "styled-components";

const GlobalStyles = createGlobalStyle`
  ${reset};
  body {
    background-color: black;
    font-size: 20px;
    color: white;
  }
  input {
    all: unset;
    box-sizing: border-box;
    appearance: none;
  }
  button {
    background-color: white;
    color: black;
  }
  a {
    text-decoration: none;
  }
  /* form {
    width: 100%;
    max-width: 400px;
  } */
`;

export default GlobalStyles;
