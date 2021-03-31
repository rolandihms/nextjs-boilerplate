import {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  'width': '100%',
  'height': '100%',
  'minHeight': '300px',
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'center',
  'margin': 'auto',
  'justifyContent': 'center',

}
const loader = {
  'color': 'rgba(180, 24, 30, 1)'
}
function LoadingMessage(state) {

    return (
        <div style={styles} className={state.fademe ? "" : "" }>
         
          <CircularProgress style={loader}/>
          <br />
          Loading application, please be patient.
          <br />
          <br />
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



class Loading extends Component {
        constructor(props) {
        super(props);
            this.state = {
                loading: true,
                fademe: false
            };
        }
    
        async componentDidMount() {
            //console.log('Splash Screen Component Did Mount')
           /*  setTimeout(() => {
            this.setState({
                fademe: true,
            });
            }, 1000)
            setTimeout(() => {
            this.setState({
                loading: false,
            });
            }, 2000)
         */
        }

        render() {
            // while checking user session, show "loading" message
            
            return (
                <div style={styles} className={this.state.fademe ? "fadeOut" : "" }>
        
                    <CircularProgress style={loader}/>
                   
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
            )
            
        }
    }



export default Loading;