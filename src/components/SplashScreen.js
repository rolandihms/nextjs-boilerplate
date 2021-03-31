import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../static/css/splashscreen.css';

const styles = {
  'width': '100%',
  'height': '100%',
  'minHeight': '500px',
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'center',
  'margin': 'auto',
  'justifyContent': 'center',
  'fontFamily':'Roboto, sans-serif',
  'fontSize': '14px',
  'color': '#666',
  'position':'fixed',
  'margin': 0,
  'padding':0,
  'top':0,
  'bottom':0
}
const loader = {
  'color': 'rgba(180, 24, 30, 1)'
}
function LoadingMessage(state) {
  
  return (
    <div style={styles} className={state.fademe ? "fadeOut" : "" }>
     
     
      <img width="100" src="/static/images/logo_badge_sml.png" alt="Wanderers" />
      <style jsx>{`
      .fadeOut {
        
        background-color: white;
        -webkit-transition: 0.5s;
        -moz-transition: 0.5s;
        -o-transition: 0.5s;
        transition: 0.5s;
        opacity: 0;
      }
    `}</style>
    </div>
  );
}

function SplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        fademe: false
      };
    }
  
    static async getInitialProps({ Component, router, ctx }) {
      let pageProps = {};
      console.log('In _APP getInitialProps +++++++++++++')
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
  
      return { pageProps };
    }
    async componentDidMount() {
        //console.log('Splash Screen Component Did Mount')
        setTimeout(() => {
          this.setState({
            fademe: true,
          });
        }, 10)
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 50)
     
    }

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage(this.state);

      // otherwise, show the desired route
      return <WrappedComponent {...this.props} />;

    }
  };
}

export default SplashScreen;