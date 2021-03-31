import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import { Link, Router } from '../routes';
import Typography from '@material-ui/core/Typography';
import Image from './Image';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    card: {
        maxWidth: 600,
      },
      subheading:{
          color: theme.palette.text.disabled,
          fontSize:'80%',
          maxWidth:'90%'
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      actions: {
        display: 'flex',
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: theme.palette.text.primary,
      },
  chip:{
    fontSize: 10,
    padding:0,
    margin:2,
    height:22

  }
});

function BlogItem(props) {
    const { classes, theme } = props;
    //console.log('IN BLOGROLLLLLLL ITEM');
    //console.log(props);
    const postItem = props.content; 
    //console.log(postItem);
    var cats = [];

    if(postItem.categories){
      cats = postItem.categories.split(',');
    }

    return (
        <Card className={classes.card}>
            
            <CardMedia
                className={classes.media}
                image={postItem.image}
                title={postItem.title}
            />
            <CardContent>
                <Typography component="h2" variant="h5" className={classes.titleText} noWrap>
                    {postItem.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" className={classes.dateText} noWrap>
                    {postItem.heading}
                </Typography>
                <Typography variant="button" style={{'minHeight':'34px'}} noWrap>
                    {postItem.sub_heading ? postItem.sub_heading : ''}
                    
                </Typography>
                <Typography variant="caption" gutterBottom>
                
                    {formatDate(postItem.publish_date)}
                </Typography>
                
                <Grid container>
                    <Grid item align="right"  xs={12}>
                    
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
                <Grid container>
                    <Grid item align="left"  xs={5}>
                        <Link href={'/post?slug='+postItem.slug} as={'/post/'+postItem.slug} >
                            <Button variant="outlined" color="secondary">
                                More...
                            </Button>
                        </Link>
                    </Grid>    
                    <Grid item align="right"  xs={7}>
                    {cats.length ? 
                        <Typography variant="caption" gutterBottom>
                            Published in:
                        </Typography>
                        : ""

                    }

                    {
                        cats.map(function(e){
                          var catT = e.split('-_-');
                          return <Chip key={e}
                                      label={catT[0].toUpperCase()}
                                      className={classes.chip}/>;

                        })
                    }
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}

BlogItem.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

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
export default withStyles(styles, { withTheme: true })(BlogItem);