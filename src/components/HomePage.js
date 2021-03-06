import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
//import {Animated} from "react-animated-css";
import Image from 'next/image';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import LocalAtm from '@material-ui/icons/LocalAtm';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Security from '@material-ui/icons/Security';
import { Link, Router } from '../routes';
//import animationData from '../static/animation/wanderers_logo_no_background.json';
//import { Player } from 'video-react';
//import Lottie from 'react-lottie';
//import "../node_modules/video-react/dist/video-react.css"; // import css

//import ReactPlayer from 'react-player'
//import Player from '../components/Content/Player';

/*const Lottie = dynamic(import('react-lottie'),
{
  loading: () => null
}
);*/

//import { Parallax, Background } from 'react-parallax';

const styles = theme => ({
    layout: {
        width: 'auto',
        maxHeight: 800,
        minHeight:700,
        margin:0,
        padding:0,
        backgroundImage: 'url(/static/slider/assets/aa6d6-wanderers_background.jpg)',
        backgroundSize:'cover',
        backgroundPosition: 'center'
    },
    vidBack: {

        zIndex:-2
    },
    gridSize:{
        width: 'auto',
        
        marginLeft: theme.spacing(1) * 2,
        marginRight: theme.spacing(1) * 2,
        [theme.breakpoints.up(1200 + theme.spacing(1) * 2 * 2)]: {
          width: 1200,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    imgText:{
        color:'#000',
        fontFamily: 'Roboto, sans-serif',
        fontWeight:'bold',
        textShadow: 'none',
        [theme.breakpoints.up(800)]: {
            color:'#fff',
            textShadow: '2px 2px '+theme.palette.primary.main,
          },
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
      display: 'block',
      marginTop: theme.spacing(1) * 2,
    },
    formControl: {
        margin: 0,
        fullWidth: true,
        display: 'flex',
        wrap: 'nowrap'
    },
    root: {
        flexGrow: 1,
    },
    paper:{
        margin: 10
    },
    control: {
        padding: theme.spacing(1) * 2,
    },
    iframe:{
        border:0,
        padding:0,
        margin:0,
        minWidth:'100%',
        minHeight:700,
        background: 'none transparent',
        backgroundImage: 'url(/static/slider/assets/aa6d6-wanderers_background.jpg)',
        backgroundSize:'cover',
        backgroundPosition: 'center'
    },
    hero:{
        minHeight:500
    },
    heroImage:{
        maxWidth:250,
        marginTop:20
    },
    heroText:{
        fontSize:22,
        fontFamily: 'Roboto, sans-serif'
    },
    heroTextsml:{
        fontSize:16,
        fontFamily: 'Roboto, sans-serif',
        color: theme.palette.primary.secondary,
        marginTop:20
    },
    card: {
        maxWidth:400
    },
    icon: {
        fontSize:50,
        marginTop:20,
    },
  });

const logoStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
}
function Stream(props) {
    // Correct! This use of <div> is legitimate because div is a valid HTML tag:
    return <stream src="f6e1d5edeae5ae19f20cb612d73b9fbd" preload autoplay loop></stream>;
  }
  
class  HomePage extends React.Component {

    state = {
        count: 0,
        image: '/static/images/background.jpg',
        show_hero_logo: true,
        irame_src : ''
    };

    // Remove the server-side injected CSS.
    componentDidMount() {
        const that = this;
       
        setTimeout(function(){
            that.setState(
                {
                    show_hero_logo: true
                }
            );
            
        }, 35);
        /* const stream = document.createElement("stream");
        stream.src = "f6e1d5edeae5ae19f20cb612d73b9fbd";
        stream.async = true;
        document.body.appendChild(stream); */

        /* const script = document.createElement("script");
        script.src = "https://embed.videodelivery.net/embed/r4xu.fla9.latest.js?video=f6e1d5edeae5ae19f20cb612d73b9fbd";
        script.async = true;
        document.body.appendChild(script); */

    }

  
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleDateChange = event => {
        this.setState({departure_date: event})
    };
    
    


   render() {
        const { classes } = this.props;
       return (
           
           <React.Fragment>
               <div >
               
               {/* <ReactPlayer
                    className={classes.vidBack}
                    poster="/static/images/background.jpg"
                    playing
                    width="100%"
                    height="100%"
                    controls={false}
                    loop={true}
                    muted={true}
                    url="https://d3rp5jatom3eyn.cloudfront.net/music/videos/1559398901198.mp4-_web.mp4"
                >
                   
                </ReactPlayer> */}
                <div  />
              
                
                <Grid container 
                    direction="row"
                    justify="center"
                    alignItems="center"
                    >
                    <br />
                    <br />
                    <Grid item xs={12} align="center">
                        <Image  
                            alt={this.props.settings.title}
                            title={this.props.settings.title}
                            src="/static/pwa.png"  width={500} height={500}/>
                    </Grid>
                </Grid>
                
                
                
                {/* this.state.show_hero_logo ? 
                    <iframe async allowtransparency="true" src={this.state.iframe_src} className={classes.iframe}/>
                    : "" */
                }
                </div>

                <br />
                <br />
                <Grid container style={{"zIndex":"3","position":"relative"}}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={8}
                    className={classes.gridSize}
                    >
    
                    
                </Grid>
           </React.Fragment>
       )
   }
}

/* HomePage.propTypes = {
   classes: PropTypes.object.isRequired,
}; */


export default compose(
   withStyles(styles),
   connect(state => state),
)(HomePage);
