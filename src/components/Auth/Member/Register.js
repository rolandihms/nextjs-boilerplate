import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux'
import compose from 'recompose/compose';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

import { Link, Router } from '../../../routes';
import NProgress from 'nprogress';
import { toggleLoading, enqueueSnackbar } from '../../../actions/index';
import getConfig from 'next/config'


import AuthService from '../../../lib/auth-service'

import { getMemberTypes} from '../../../lib/member-methods';



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

const steps = ['Personal Detail', 'Membership Detail', 'Review'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 />;
    default:
      throw new Error('Unknown step');
  }
}

class Register extends React.Component {
  
  state = {
    activeStep: 0,
  };

  handleNext = () => {

    

    console.log(this.props.member)
    //Validate input
    if(typeof this.props.member.detail === 'undefined'){

    }else{
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
    }

    console.log('Current Step '+this.state.activeStep)


  };

  handleSubmit = () => {
      const {dispatch} = this.props;
      console.log('Gonna submit');
      dispatch(toggleLoading(true));
      NProgress.start();
      const auth = new AuthService(process.env.IA_BACKEND_URL);
      var params = this.props.member.member;
      params.options = this.props.member.options;
      auth.register(this, params)
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

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        
        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Become a Member
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your interest in becoming a member.
                  </Typography>
                  <Typography variant="subtitle1">
                    We will process your request and you will receive confirmation from the club management
                    on what steps to take next in order to activate your membership.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={this.props.loading}
                      onClick={activeStep === 2 ? this.handleSubmit : this.handleNext }
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Send Request' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(state => state),
)(Register);
