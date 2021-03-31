import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import Image from './Image';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import BreadCrumbs from '../components/BreadCrumbs';
import SocialSharing from '../components/Content/SocialSharing';


//import Parallax from "../components/Parallax/Parallax.jsx";
import Content from '../components/Content/Content';


import { Parallax, Background } from 'react-parallax';

const styles = theme => ({
    layout: {
        width: 'auto',
        
        marginLeft: 10,
        marginRight: 10,
        [theme.breakpoints.up(1000 + theme.spacing.unit * 2 * 2)]: {
          width: 1000,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    social:{
        textAlign: 'right',
        align: 'right'
    },
    title: {
        color: '#fff',
        fontFamily: 'Roboto, sans-serif',
        zIndex:9999,
        
    },
    parallax: {
        minHeight:300
    },
    breadcrumbs: {
        marginTop:10,
        zIndex:9999,
        outline:0,
        boxShadow:0,
       
    },
    subheading: {
        color: '#fff',
        fontFamily: 'Roboto, sans-serif',
        zIndex:9999,
        fontSize:16
       
    },
    pageTitle:{
        fontFamily: 'Roboto, sans-serif',
        fontSize: 30
    },
    pageHeading:{
        fontFamily: 'Roboto, sans-serif',
        fontSize: 18,
        
    },
    vignette:{
        width: '100%',
        borderBottom: '2px solid '+theme.palette.secondary.main,
        marginBottom: 15,
        marginTop:5
    }
  });


class  PageContent extends React.Component {

    /* state = {
        general: {
            page: {
                title:'',
                heading:''
            }
        }
    } */
    // Remove the server-side injected CSS.
   componentDidMount() {
        //console.log('PageCOntent cmponent mounted')
        //console.log(this.props)
   }

   render() {
       const { classes } = this.props;

       var image = '/static/images/background.jpg';
       var strA = [];
       const IA_ASSETS_PATH = process.env.IA_ASSETS_PATH; 
        if(typeof this.props.general.page.images !== 'undefined'){
            if(typeof this.props.general.page.images === 'string'){
                //console.log('Component has image');
                //console.log(this.props.general.page.images)
                strA = this.props.general.page.images.split(',');
                
                if(strA.length > 1){
                    //console.log('Multiple image '+strA.url)
                    image = IA_ASSETS_PATH+'/assets/images/'+strA[0];
                }else if(strA.length > 0){
                    image = IA_ASSETS_PATH+'/assets/images/'+strA[0];
                    //console.log('Single image '+strA[0])
                }else{
                    //console.log('No Image');
                    return (<div></div>)
                }
                /* console.log('Component image ==> ');
                console.log(strA); */
                //this.setState({'image':image})
            }
        }
        return (
           
           <React.Fragment>
                <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center" >
                    {/* <Image mg  src="/static/images/logo_200.png" alt="logo" /> */}
                </Grid>
                <Parallax className={classes.parallax}
                    blur={{ min: -15, max: 15 }}
                    bgImage={image}
                    bgImageAlt={this.props.general.page.title}
                    strength={-200}
                >
                
                        <Grid container 
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                            className={classes.layout}>
                            <Grid item xs={12} sm={12} md={6}>
                                <h1 className={classes.title}>{this.props.general.page.title}</h1>
                                <h4  className={classes.subheading}>
                                {this.props.general.page.heading}
                                </h4>
                                <br />
                                
                            </Grid>
                        </Grid>

                    
                </Parallax>
                
                <div className={classes.layout}>
                    <Grid container 
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        className={classes.layout}>
                        <Grid item xs={12}  sm={9}>
                            <div  className={classes.breadcrumbs}>
                                <BreadCrumbs />
                            </div>                
                            
                            <Typography variant="h3" className={classes.pageTitle}>
                                {this.props.general.page.title}
                            </Typography>
                            <Typography variant="h6" gutterBottom className={classes.pageHeading}>
                                {this.props.general.page.heading}
                            </Typography> 
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.social}>
                            <SocialSharing detail={this.props.general.page}/>
                        </Grid>
                        
                    </Grid> 
                    <div className={classes.vignette} /> 
               </div>

               {this.props.general.content.length ? <Content content={this.props.general.content} /> : ''}
           </React.Fragment>
       )
   }
}

/* PageContent.propTypes = {
   classes: PropTypes.object.isRequired,
}; */


export default compose(
   withStyles(styles),
   connect(state => state),
)(PageContent);
