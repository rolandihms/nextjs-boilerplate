import React, {Component} from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux'
import compose from 'recompose/compose';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import NProgress from 'nprogress';
import { toggleLoading, enqueueSnackbar } from '../../../actions/index';
import getConfig from 'next/config'


import AuthService from '../../../lib/auth-service'

import { getMemberTypes} from '../../../lib/member-methods';

import  MemberForm  from './MemberForm';


const styles = theme => ({

  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});



class Update extends Component {
  
  state = {
    activeStep: 0,
  };


  handleSubmit = () => {
      const {dispatch} = this.props;
      console.log('Gonna submit');
      dispatch(toggleLoading(true));
      NProgress.start();
      const auth = new AuthService(process.env.IA_BACKEND_URL);
      var params = this.props.member.detail;
      params.options = this.props.member.options;
      auth.update(this, params)
        .then(res => {
            console.log('Back in Sign In comp')
            console.log(res);
            console.log(res.msg)
            //this.props.url.replaceTo('/index');
            if(res.success){
                //Access this via res.instance passed into the service
                res.instance.setState(state => ({
                  activeStep: 3,
                }));
            }else{

              //Show Error
              dispatch(enqueueSnackbar({message: res.error.toString(),options: {variant: 'error'}}));
            }
            dispatch(toggleLoading(false));
            NProgress.done();
        })
        .catch(e => {
          console.log(e);
          dispatch(toggleLoading(false));
          NProgress.done()
        });
  }


  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    console.log('UPDATE COMPOMENT MEMBER++++++++++++++++++');
    console.log(this.props.member)
    return (
      <React.Fragment>
        
        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Update Account
            </Typography>
            <MemberForm member={this.props.member} auth={this.props.auth}/>
            <React.Fragment>
                <Button
                    variant="contained"
                    color="primary"
                    align="right"
                    disabled={this.props.loading}
                    onClick={this.handleSubmit }
                    className={classes.button}
                >
                    Update
                </Button>
            </React.Fragment>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

Update.propTypes = {
  classes: PropTypes.object.isRequired,
  member: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(state => state),
)(Update);
