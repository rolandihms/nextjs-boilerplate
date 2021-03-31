import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Link, Router } from '../routes';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


//Content-Methods / Functions
import {getPostCategories} from '../lib/content-methods';


BlogCategories

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
class BlogCategories extends React.Component {
    
    state = {
        categories: []
    }
    async componentDidMount(){
        
        if (typeof window !== 'undefined') {
            var cats = localStorage.getItem('post_categories');
            if(cats){
                cats = JSON.parse(cats);
            }
            
            //No local
            if (cats === null) {
                //Get Categroies
                cats = await getPostCategories({limit: 30});
                localStorage.setItem('post_categories', JSON.stringify(cats));
            }
        }else{
            //Get Categroies
            const cats = await getPostCategories({limit: 30});
            
        }
        this.setState({categories: cats})
        return {cats}
    }

    renderBlogCats(cats){
        const { classes } = this.props;
        return cats.map(function(e){

            if(e.total_records == 0){
                return '';
            }
            var count = e.total_records || 0;
            return (
                <div key={e.category_id} className={classes.ulLinks}>
                    <ListItem button>
                        <Link href={'/posts?category='+e.title+'/&category_id='+e.category_id} 
                                as={'/posts/'+e.title+'?category_id='+e.category_id}>
                            <div>
                                <ListItemText primary={e.title} />
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
        
        return (
            <List component="nav" className={classes.root}>
                {this.renderBlogCats(this.state.categories)}
            </List>
           
          
        );
    }
    
}

BlogCategories.propTypes = {
  classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired,
};
export default compose(
    withStyles(styles),
    connect(state => state),
 )(BlogCategories);
 