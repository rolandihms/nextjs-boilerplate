

import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from "@material-ui/core/Button";
import MoreIcon from '@material-ui/icons/MoreVert';
import AddAlert from '@material-ui/icons/AddAlert';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux';
import {toggleMenu} from '../actions/index';
import { Link, Router } from '../routes';
import AuthService from '../lib/auth-service';
import getConfig from 'next/config';
import {subscribeSW } from '../lib/member-methods';
import Tooltip from '@material-ui/core/Tooltip';

const Auth = new AuthService(process.env.IA_BACKEND_URL);


const styles = theme => ({
  root: {
    width: '100%',
    zIndex:33,
    position:'relative'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1) * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  links:{
    color: '#FFF',
    textDecoration: 'none',
  },
  linksM:{
    color: '#000',
    textDecoration: 'none',
  }
});



class SearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    logged_in: false,
    sw: false
  };
  constructor(props) {
    super(props);
    this.handleSubscripePush = this.handleSubscripePush.bind(this);
  } 
  componentDidMount(){

    if (Auth.loggedIn()) {
      console.log('LOOOOOOOOOOOOOOOOOedddi in');
      this.setState({logged_in: true});
    }

    if ('serviceWorker' in navigator) {
      this.setState({sw: true});
       //IE FIX show Sub Button
      /* if (document.querySelectorAll) {
          console.log('GONNA VALIDATE SHOW SUB BUTTON')
          var els = document.querySelectorAll(".alert-push-button");
          for (var x = 0; x < els.length; x++){
            els[x].style.display = this.props.push_status ? 'block' : 'none';
          } 
      } */
    }
   
  }

  openMenu =  (open) => () => {
    const { dispatch } = this.props;
    console.log('TOGGLE MENU!!!');

    //const m = toggleMenu(open);
    return dispatch(toggleMenu(open));
  };

  handleSubscripePush = (event) => {
    
      subscribeSW({member_id: null });

  };
  
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  handleLogout = () => {
      this.setState({ mobileMoreAnchorEl: null });
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      if(typeof window !== 'undefined'){
        window.location.href = '/';
      }
  };

  handleRedirect(path){

    console.log(path)
    //Router.push(path)

  };


  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        {  this.state.logged_in ? 
          <MenuItem onClick={this.handleMenuClose}>
            <Link href="/member/dashboard"><p>Profile</p></Link>
          </MenuItem> 
          : 
          <MenuItem onClick={this.handleMenuClose}>
            <Link href="/member/register"><p>Register</p></Link>
          </MenuItem>  
        }
        {  this.state.logged_in ? 
          <MenuItem onClick={this.handleLogout}>
            <p>Logout</p>
          </MenuItem> : ''
        }
        {  !this.state.logged_in ? 
          <MenuItem onClick={this.handleMenuClose}>
            <Link href="/member/login"><p>Login</p></Link>
          </MenuItem> : ''
        }
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >



      {  this.state.logged_in ?   
        <Link href="/member/dashboard" as="/member/dashboard">
          <MenuItem onClick={this.handleProfileMenuOpen}>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <p>DashBoard</p>
          </MenuItem>
        </Link>
      : 
        <Link href="/member/register" as="/member/register">
          <MenuItem onClick={this.handleProfileMenuOpen}>
            <p>Register</p>
          </MenuItem>
        </Link>
      }
      {  !this.state.logged_in ?   
        <Link href="/member/login" as="/member/login">
          <MenuItem onClick={this.handleProfileMenuOpen}>
            <p>Login</p>
          </MenuItem>
        </Link>
      : ''
        
      }


       </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.openMenu(true)} 
                        className={classes.menuButton} 
                        color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            
            <Hidden only="xs">
              <Link href="/index" as="/">
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                  Next
                </Typography>
              </Link>
            </Hidden>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                aria-label="Search..."
                inputProps={{
                  'aria-label' : 'Search'
                }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            {  this.state.logged_in ? 
                ''
              : 
              ''
            }
            {  this.state.logged_in ?   
              <IconButton color="inherit">
                <Badge badgeContent={this.props.notifications.length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              : 
              ''
            }

             
              <Tooltip title="Subscribe for Notification" aria-label="Subscribe for Notification">
                <IconButton
                  id="push_alert_btn"
                  className="alert-push-button"
                  aria-label="Subscribe"
                  style={{'display': this.props.push_status ? 'none' : 'block' }}
                  onClick={this.handleSubscripePush}
                  color="inherit"
                >
                  <AddAlert />
                </IconButton>
              </Tooltip>
            
              
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                aria-label="Open Menu"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" aria-label="Open Menu" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(
  withStyles(styles),
  connect(state => state),
)(SearchAppBar);