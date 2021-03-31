import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/OpenWith';
import Image from '../Image';
import Lightbox from 'react-image-lightbox';
//import tileData from './tileData';
import classnames from 'classnames';
//Content-Methods / Functions
import {getImages} from '../../lib/content-methods';

import Typography from '@material-ui/core/Typography';

const api_url = process.env.IA_API_URL || '';
const IA_BACKEND_URL = process.env.IA_BACKEND_URL || ''; 
const IA_ASSETS_PATH = process.env.IA_ASSETS_PATH || ''; 

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        maxWidth: '100%',
        height: 'auto',
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.80)',
      },
      gridItemFullHeight:{
          
        left: '50%',
        height: 'auto',
        position: 'relative',
        transform: 'translateX(-50%)',
        
      },
      gridItemFullWidth:{
        left: '50%',
        width: '100%',
        height: 'auto',
        position: 'relative',
        transform: 'translateX(-50%)'
          
      },
      gridItemFull:{
        
        maxWidth:600,
        maxHeight:300,
        position: 'relative',
        transform: 'translateX(-50%)',
        
      },
      gridContainer:{
          height: 'auto',
          maxHeight:300,
          padding: 0,
          [theme.breakpoints.up(800)]: {
            maxHeight:500,
          }
      }
  });
class Gallery extends React.Component {  
    
    constructor(props) {
        super(props);
        //setting state
        this.state = { 
            images: {
                
            },
            photoIndex:0,
            isOpen: false, 
        };
        this.openLightBox = this.openLightBox.bind(this);
        
    };
    



    async componentDidMount () {
        const { dispatch } = this.props;

        //Get All Images for Gallery
        if(this.props.hasImages){
            //has images 
            if(typeof JSON.parse(this.props.content.images) === 'object'){

                var imagesA = JSON.parse(this.props.content.images).map(function(e){
                    //console.log(e);
                    e.final_url = e.url;
                    e.img_file = e.url;
                    e.title = '';
                    e.created_at = '';
                    return e;
                    //return {title: e.url}
                });
                this.setState({
                    images: imagesA
                })
            }
        
            //var images = 
        }else{
            var images = await getImages({gallery_id: this.props.content.gal_id});
            if(typeof images.error === 'undefined'){
                this.setState({
                    images: images.result
                })
            } 
        }
        
    }

    renderImages(images){
        const { classes } = this.props;
        if(typeof images === 'undefined'){
            return null;
        }
        let that = this;
        var counter = 0;
        return Object.keys(images).map(function(e){

            var styles = {}
            var index = e;
            var tText = that.props.content.title;//Gallery title
            if(typeof e !== 'object'){
                e = images[e];
            }
            var x = 1;
            if(counter % 3 == 0){
                x = 2;
                e.image = IA_ASSETS_PATH+'/image/r/?path=images/'+e.img_file+'&w=650&h=400'; 
                var classG = 'gridItemFullHeight';
                
            }else{
                
                e.image = IA_ASSETS_PATH+'/image/rs/?path=images/'+e.img_file+'&w=350&h=200';
                var classG = 'gridItemFullWidth';
            }
            //If full url present
            if(typeof e.final_url !== 'undefined'){
                classes[classG] = 'gridItemFull';
                e.image = e.final_url;
                styles = {
                    'backgroundImage': 'url('+e.image+')',
                    'backgroundSize': 'cover',
                    'backgroundPosition': 'center',
                    'overflow': 'hidden',
                    'border': '2px solid white'
                }
            }
            if(e.title.length > 2){
                tText = e.title;
            }
            var key = (e.img_id ? e.img_id : Math.random(9999,99999)); 

            
            //console.log('In image loop '+counter);
            //console.log(e)
            counter ++;
            return (
                <GridListTile  key={key} cols={x} rows={x} onClick={() => that.openLightBox(index)}
                   style={styles} className={classes.gridContainer}
                >
                    {/* <img src={e.image} alt={e.title} />  */}

                    {e.final_url ? "" :
                        <Image mg alt={tText} className={classes[classG]}
                            title={tText}
                            src={e.image} />
                    }
                    <GridListTileBar
                    
                        title={tText}
                        subtitle={<span> {formatDate(e.created_at)}</span>}
                        actionIcon={
                            <IconButton className={classes.icon}
                                onClick={() => that.openLightBox(index)}
                            >
                                <InfoIcon />
                            </IconButton>
                        }
                    />
                </GridListTile>
            )
        })
    }
    openLightBox(index){
        console.log('Click Light Box')
        this.setState({ isOpen: true , photoIndex: index})
    }
    getImagePath(index){

        if(typeof this.state.images[index].final_url !== 'undefined'){
            return this.state.images[index].final_url;
        }else{
            return IA_ASSETS_PATH+'/assets/images/'+this.state.images[index].img_file;
        }
        
    }
    render(){
        const { classes } = this.props;
        const { photoIndex, isOpen } = this.state;
        //return (null)
        const tileData = this.props.content;
        const images = this.state.images;
        return (
            <React.Fragment>
                <GridList cellHeight={180} className={classes.gridList} >
                
                    {this.renderImages(images)}
                </GridList>
                { isOpen && (
                    <Lightbox
                    mainSrc={this.getImagePath(photoIndex)}
                    nextSrc={this.getImagePath((photoIndex + 1) % images.length)}
                    prevSrc={this.getImagePath((photoIndex + images.length - 1) % images.length)}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    onMovePrevRequest={() =>
                        this.setState({
                        photoIndex: (photoIndex + images.length - 1) % images.length,
                        })
                    }
                    onMoveNextRequest={() =>
                        this.setState({
                        photoIndex: (photoIndex + 1) % images.length,
                        })
                    }
                    />
                )}
            </React.Fragment>
        )
    }
}


function formatDate(datestr) {

    var date = new Date(datestr);
    if(date == 'Invalid Date'){
        return '';
    }
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

  

export default withStyles(styles)(Gallery);