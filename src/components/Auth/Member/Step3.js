import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import compose from 'recompose/compose';
import { setMemberRegistration } from '../../../actions';


const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Step3 extends React.Component {
    
    
    renderOverview = (member) => {
        const { classes } = this.props;
        var Liste = [];
        member = member || {}
        Object.keys(member).forEach(function(key) {
            if(member.hasOwnProperty(key)){
                var keyT = key.replace('_', ' ').toUpperCase();
                Liste.push(
                    <ListItem className={classes.listItem} key={keyT}>
                        <ListItemText primary={member[key]} secondary={keyT} />
                        <Typography variant="body2"><div>{member[key]}</div></Typography>
                    </ListItem>
                )
            }
        });
        return Liste;
        return Object.keys(member).map(member => {
            
            return (
              <Grid item xs={6} lg={6} key={member.email}>
                <FormControlLabel 
                  control={<Checkbox 
                              color="secondary" 
                              name={option.title} 
                              
                              ref={option.title}
                              value={option.type_id.toString()} 
                              onClick={this.handleCheck}    
                          />}
                  label={option.title}
                />
              </Grid>
            );
        });
    }
    render(){
        const { classes } = this.props;
        const member = this.props.member.member;
        return (
            <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Membership Summary
            </Typography>
            <List disablePadding>
                <Grid container direction="row" spacing={8}>
                    <Grid item xs={12} md={6}>
                        <ListItem className={classes.listItem} key="First Name">
                            <ListItemText primary="First Name" secondary={this.props.member.member.first_name} />
                        </ListItem>
                    </Grid>    
                    <Grid item xs={12} md={6}>
                        <ListItem className={classes.listItem} key="Last Name">
                            <ListItemText primary="Last Name" secondary={this.props.member.member.last_name} />
                        </ListItem>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ListItem className={classes.listItem} key="Address">
                            <ListItemText primary="Address" secondary={this.props.member.member.address} />
                        </ListItem>
                    </Grid>    
                    <Grid item xs={12} md={6}>
                        <ListItem className={classes.listItem} key="Postal Address">
                            <ListItemText primary="Postal Address" secondary={this.props.member.member.post_code} />
                        </ListItem>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ListItem className={classes.listItem} key="Email">
                            <ListItemText primary="Email" secondary={this.props.member.member.email} />
                        </ListItem>
                    </Grid>    
                    <Grid item xs={12} md={6} align="right">
                        <ListItem className={classes.listItem} key="Mobile Number">
                            <ListItemText primary="Mobile Number" secondary={this.props.member.member.contact_number} />
                        </ListItem>
                    </Grid>
                </Grid>
                {/* this.renderOverview(member) */}
            </List>
           
            </React.Fragment>
        );
    }

}

Step3.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    connect(state => state),
  )(Step3);