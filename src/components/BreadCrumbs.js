import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paper: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    outline:0,
    boxShadow:0,
    //border:'1px solid #ccc'
  },
});

function handleClick(event) {
  event.preventDefault();
  alert('You clicked a breadcrumb.'); // eslint-disable-line no-alert
}

class BreadCrumbs extends React.Component {

  state = {
    url : ''
  }

  componentDidMount(){
      var loc = window.location.pathname;
      ////console.log('Component DIDDDDDDDDDD MOUNT Breadcrums');
      //console.log(loc);
      //console.log(loc.split('/'))
      //console.log(this.props);
      this.setState({url: loc.split('/')})
  }

  renderCrumbs(links){

    ////console.log(links);
    ////console.log('Links length::: '+links.length)

    var crumbs = [];
    crumbs.push(
      <Link key="home" color="inherit" href={'/index'} as={'/'}>
            Home
      </Link>
    )

    if(typeof links[1] !== 'undefined'){
      crumbs.push(
        <Link key={links[1]} color="inherit" href={'/'+links[1]} as={'/'+links[1]}>
              {links[1]}
        </Link>
      )
    }


    if(typeof links[2] !== 'undefined' && links.length === 3){
      crumbs.push(
        <Link key={links[2]} color="inherit" href={'/'+links[1] +'/'+ links[2]}>
              {links[2]}
        </Link>
      )
    }
    return (crumbs);
    /* return links.map(function(e){
        //console.log('In Loop Crumbs');
        //console.log(e);
        return (
          <Link color="inherit" href="/lab/about/" onClick={handleClick}>
              Lab
          </Link>
        )
    }) */
  }

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        
        <div className={classes.paper}>
          <Breadcrumbs aria-label="Breadcrumb">
            {/* <Link color="inherit" href="/" onClick={handleClick}>
              Home
            </Link>
            <Link color="inherit" href="/lab/about/" onClick={handleClick}>
              Lab
            </Link>
            <Link
              color="textPrimary"
              href="/lab/about/breadcrumbs"
              onClick={handleClick}
              aria-current="page"
            >
             Current
            </Link> */}

            {this.renderCrumbs(this.state.url)}
          </Breadcrumbs>
        </div>
      </div>
    );
  }
  
}

BreadCrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    connect(state => state),
 )(BreadCrumbs);
 
//export default withStyles(styles)(BreadCrumbs);