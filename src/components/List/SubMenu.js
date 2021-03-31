import React from "react";
import PropTypes from "prop-types";
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from '../../routes'
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore'
const styles = {
  subMenuItem: {
    display: "flex",
    justifyContent: "space-between"
  }
};


class SubMenu extends React.Component {

    state = {
        menuOpen: false,
        anchorElement: null,
        open: false
    }
    anchorElement = null;
    menuOpen = false;
    setAnchorElement = node => {
        this.anchorElement = node;
    };

    renderSubMenuItems = (menu) => {
        return menu.map(menuItem => {
            var slugA = menuItem.slug.split('/');
            return (
                
                <ListItem button key={'child_'+Math.random(9999,9999)}>
                    <Link href={'/'+slugA[0]+'?slug='+slugA[1]} as={'/'+menuItem.slug} >
                        <ListItemText inset primary={menuItem.title} />
                    </Link>
                </ListItem>
            );
        });

    }
    handleItemClick(event) {
        if (!this.anchorElement) {
        this.setAnchorElement(event.currentTarget);
        }
        this.menuOpen = !this.menuOpen;
    }

    expandCollapse = () => {
        this.setState(state => ({ open: !state.open }));
    }

    handleSubMenuClose() {
        this.menuOpen = false;
    }

    render() {
        const {  parent, content, classes } = this.props;
        var slugParent = parent.slug.split('/');
        return (
        <React.Fragment>
            <ListItem button key={'daddy_'+parent.menu_id+Math.random(99999,999999)} >
                <Link href={'/'+slugParent[0]+'?slug='+slugParent[1]} as={'/'+parent.slug} >
                    <ListItemText primary={parent.title} />
                </Link>
                {this.state.open ? <ExpandLess onClick={this.expandCollapse}/> : <ExpandMore onClick={this.expandCollapse} />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {this.renderSubMenuItems(content)}
                </List>
            </Collapse>  
        </React.Fragment>
        );
    }
}

SubMenu.propTypes = {
   content: PropTypes.array.isRequired,
   parent: PropTypes.object.isRequired
};

export default withStyles(styles)(SubMenu);
