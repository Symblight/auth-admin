import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    height: 100vh;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }
  :root {
    font-size: 16px;
  }

  body {
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    height: 100vh;
    overflow: hidden;
  }
  #root {
    height: 100vh;
    display: flex;
    flex-direction: row;
  }
  tt,
  code,
  kbd,
  samp,
  listing {
    font-family: hasklig, Hack, "Fira Code", "Source Code Pro", monaco, menlo,
      consolas, monospace;
    font-variant-ligatures: contextual;
  }
`;
