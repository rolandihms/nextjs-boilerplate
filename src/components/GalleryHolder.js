import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Gallery from '../components/Content/Gallery';


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
  
});
class GalleryHolder extends React.Component {
    

    renderBlogRoll(posts){
        
        if(typeof posts === 'undefined'){
            return '';
        }
        return Object.keys(posts).map(function(e){

            if(typeof e !== 'object'){
                e = posts[e];
            }
            //console.log(e)
            if(e.images){
                var iA = e.images.split(',');
                e.image = process.env.IA_ASSETS_PATH+'/image/rs/?path=images/'+iA[0]+'&w=200&h=200';
            }else{
                e.image = null;
            }
            return (
              <Grid item xs={12} sm={12} md={6} lg={4} key={e.post_id}><BlogItem content={e} /></Grid>
            )
        })
    }
    
    render(){
        const { classes } = this.props;
        const posts = this.props.general.posts.result; 
        return (
            <Grid container className={classes.layout} spacing={8} direction="row" justify="center">
               {this.renderBlogRoll(posts)}
            </Grid>
        );
    }
    
}

GalleryHolder.propTypes = {
  classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired,
};
export default compose(
    withStyles(styles),
    connect(state => state),
 )(GalleryHolder);
 