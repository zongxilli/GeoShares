import React from "react";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import teal from "@material-ui/core/colors/teal";
import CssBaseline from "@material-ui/core/CssBaseline";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createTheme({
  palette: {
    primary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700]
    },
    secondary: {
      light: teal[300],
      main: teal[500],
      dark: teal[700]
    }
  },
  typography: {
    useNextVariants: true
  }
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {/* https://material-ui.com/getting-started/usage/#cssbaseline */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
