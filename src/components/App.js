

import CssBaseline from '@material-ui/core/CssBaseline';
import { 
    MuiThemeProvider, 
    createMuiTheme, 
    withStyles,
    createGenerateClassName  
} from '@material-ui/core/styles';
/* 
Theme generator
https://in-your-saas.github.io/material-ui-theme-editor/

*/
//import SplashScreen from './SplashScreen';
//Get Theme
const themeJSON = require('../theme.json');

themeJSON.typography = {
  useNextVariants: true
}

const theme = createMuiTheme(themeJSON);

//export default withStyles(styles)(Layout)
export default ({ children }) => (
  <div>
    <MuiThemeProvider theme={theme} >
    <CssBaseline />
    {children}
    </MuiThemeProvider>
  </div>
)