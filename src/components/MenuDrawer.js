import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { withRouter } from 'next/router';

import { Link, Router } from '../routes';

import {toggleMenu} from '../actions/index';

import SubMenu from "./List/SubMenu";


const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(1) * 4,
  },
  menuLogo:{
        textAlign: 'center',
        align: 'center'
  }
});


class MenuDrawer extends React.Component {
    state = {
        show_menu: false,
        open : false
    };
    componentDidMount () {
        const { dispatch } = this.props
    }
    toggleDrawer = (side, open) => () => {
        const { dispatch } = this.props;
        dispatch(toggleMenu(open));
    };

    renderSubMenu = (menu) => {
        return menu.map(menuItem => {

            return (
                
                <SubMenu key={'child_'+Math.random(9999,9999)} content={menuItem} />
                
            );
        });

    }

    renderMenuItems = (position) => {
        const { menuItems, classes , router } = this.props;
        
        var menu = this.props.general.menu;

        if(typeof menu.findIndex === 'function'){
            var index = menu.findIndex(x => x.position === position);
            
            if(index !== -1){

                var arr = JSON.parse(menu[index].menu);

                return arr.map(menuItem => {
                    var slug = menuItem.slug.split('/');

                    if(slug[0] === 'page' || slug[0] === 'post' 
                            || slug[0] === 'package'
                            || slug[0] === 'category'
                        ){
                           var slugStr =  '/'+slug[0]+'?slug='+slug[1];
                    }else{
                        var slugStr =  menuItem.slug;
                    }
                    if(typeof menuItem.children === 'object'){
                        return (
                            <List  key={'top_daddy_'+menuItem.menu_id+Math.random(99999,999999)} >
                                <SubMenu key={'child_'+Math.random(9999,9999)} parent={menuItem} content={menuItem.children} /> 
                            </List>
                        );
                    }else{
                        return (
                            <ListItem button key={'dad_'+menuItem.menu_id+Math.random(9999,9999)} onClick={this.toggleDrawer('show_menu', false)}>
                                <Link href={slugStr} as={slugStr} >
                                    <ListItemText primary={menuItem.title} />
                                </Link>
                            </ListItem>
                        );
                    }
                    
                    
                });
            }
        }
       
    };


    render() {
        
        const { classes , router} = this.props;

        const sideList = (
            <div className={classes.list}>
            
                <List component="nav">
                    {this.renderMenuItems('top_main')}
                </List>
            </div>
        );

        return (
            <div>
                <SwipeableDrawer
                    open={this.props.show_menu}
                    onClose={this.toggleDrawer('show_menu', false)}
                    onOpen={this.toggleDrawer('show_menu', true)}
                    aria-label="Open Menu"
                >
                    <div
                        tabIndex={0}
                        role="button"
                        /* onClick={this.toggleDrawer('show_menu', false)}
                        onKeyDown={this.toggleDrawer('show_menu', false)} */
                    >
                        <ListItem button key="home"  className={classes.menuLogo} onClick={this.toggleDrawer('show_menu', false)}>
                            <Link href="/" prefetch as="/" >
                                <img width="50" src="/static/images/logo_badge_sml.png" align="center"  alt="Wanderers" />
                            </Link>
                        </ListItem>
                        {sideList}
                    </div>
                </SwipeableDrawer>
                
            </div>
        );
    }
}

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

//export default withRouter(connect(state => state)(MenuDrawer)); 
export default compose(
    withRouter,
    withStyles(styles),
    
    connect(state => state),
)(MenuDrawer);