import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey900, lightBlueA700} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: lightBlueA700
  },
  drawer: {
    width: 230,
    color: grey900
  },
  raisedButton: {
    primaryColor: lightBlueA700,
  }
});


export default themeDefault;