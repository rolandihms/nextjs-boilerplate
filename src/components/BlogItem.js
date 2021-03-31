import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import { Link, Router } from '../routes';
import Typography from '@material-ui/core/Typography';
import Image from './Image';


const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardDetails: {
    flex: 1,
  },
  titleText:{
    fontSize: 16,
    [theme.breakpoints.up(1200 + theme.spacing.unit * 2 * 2)]: {
      fontSize: 18,
    }
  },
  dateText:{
    fontSize: 12,
    [theme.breakpoints.up(1200 + theme.spacing.unit * 2 * 2)]: {
      fontSize: 14,
    }
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    alignItems: 'flex-end',
  },
  cardMedia: {
    width: 180,
    height:180
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
        
        <Grid item key={postItem.post_id} xs={12} md={12}>
            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                  <CardContent>
                      <Typography component="h2" variant="h5" className={classes.titleText} noWrap>
                        {postItem.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary" className={classes.dateText} noWrap>
                        {postItem.heading}
                      </Typography>
                      <Typography variant="button" style={{'maxWidth':'280px','minHeight':'34px'}} noWrap>
                          {postItem.sub_heading ? postItem.sub_heading : ""}
                          
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        
                        {formatDate(postItem.publish_date)}
                      </Typography>
                      <Grid container>
                          <Grid item  xs={5} >
                            <Link href={'/post?slug='+postItem.slug} as={'/post/'+postItem.slug}>
                              <Button variant="outlined" color="secondary">
                                More...
                              </Button>
                            </Link>
                          </Grid>
                          <Grid item align="right"  xs={7}>
                            {
                              cats.map(function(e){

                                return <Chip key={e}
                                            label={e.toUpperCase()}
                                            className={classes.chip}/>;

                              })
                            }

                          </Grid>
                      </Grid>
                  </CardContent>
                </div>
               {/*  <Hidden xsDown> */}
                {postItem.image ? 
                <Image mg className={classes.cardMedia} 
                  alt={postItem.title} 
                  title={postItem.title} 
                  src={postItem.image}  />
                 : ''
                }
               {/*  </Hidden> */}
            </Card>
        </Grid>
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