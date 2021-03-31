import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, Router } from '../routes';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


//Content-Methods / Functions
import {getPostCategories} from '../lib/content-methods';


const styles = theme => ({
    layout: {
        width: 'auto',
        marginTop:20,
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.up(1200 + theme.spacing.unit * 2 * 2)]: {
          width: 1200,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    card: {
    display: 'flex',
  },
  ulNav:{
      listStyle: 'none',
      margin:0,
      padding:0
  },
  ulLinks:{
    color:theme.palette.primary.main,
    fontFamily: 'Roboto, sans-serif',
    marginTop: 10,
    fontSize: 15,
    cursor: 'pointer',
    textDecoration: 'none',
     '&:hover': {
      color: theme.palette.secondary.main
   }
  },
  chip: {
    margin: 5,
    height:40,
    fontSize: 16
  },
  badge:{
      marginLeft:-20,
      marginTop: 25,
      right: -3,
    
  }
});
class GalleryCategories extends React.Component {
    
    state = {
        galleries: []
    }
    async componentDidMount(){
        console.log('In Gallery Links')
        this.setState({galleries: this.props.content})
       
    }

    renderGalleryCats(galleries){
        const { classes } = this.props;
        if(typeof galleries === 'undefined'){
            return '';
        }
        return Object.keys(galleries).map(function(e){
            if(typeof e !== 'object'){
                e = galleries[e];
            }
            if(e.total_records == 0){
                return '';
            }
            var count = 0;
            if(e.images){
                count = (e.images).split(',').length || 0;  
            }
            
            return (
                <div key={e.gal_id} className={classes.ulLinks}>
                    <ListItem button>
                        <Link href={'/gallery?category='+e.title+'/&gallery_id='+e.gal_id} 
                                as={'/gallery/'+e.title+'?gallery_id='+e.gal_id}>
                            <div>
                                <ListItemText style={{'overflow' : 'hidden'}} primary={e.title} secondary={count+' total images'}/>
                                <ListItemSecondaryAction >
                                    <Badge className={classes.badge}
                                        badgeContent={count} color="primary"
                                    >
                                        <p></p>
                                    </Badge>
                                </ListItemSecondaryAction>    
                            </div>
                        </Link>
                    </ListItem>

                </div>
            )
        })
    }
    
    render(){
        const { classes } = this.props;
        const { galleries } = this.props;
        return (
            <List component="nav" className={classes.root}>
                {
                    this.props.query.gallery_id ? 
                    <ListItem button>
                        <Link href={'/gallery'} 
                                as={'/gallery'}>
                            <div>
                                <ListItemText style={{'overflow' : 'hidden'}} primary={'All Albums'} secondary={'Go to all Albums'}/>
                               
                            </div>
                        </Link>
                    </ListItem> : ""
                }
                {this.renderGalleryCats(this.state.galleries)}
            </List>
           
          
        );
    }
    
}

GalleryCategories.propTypes = {
  classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired,
};
export default withStyles(styles)(GalleryCategories);
 