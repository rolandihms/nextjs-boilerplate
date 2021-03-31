import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Router from 'next/router';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import NProgress from 'nprogress';

import {subscribeSW } from '../../lib/member-methods';
import AuthService from '../../lib/auth-service';

import {setLogin,setMember,enqueueSnackbar, toggleLoading} from '../../actions/index';
import { Link } from 'next/link';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },

  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  forgotLink:{
    fontSize:12,
    textTransform: 'capitalize',
    marginTop:10
  }
});





const auth = new AuthService(process.env.IA_BACKEND_URL);

//console.log(auth);


class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleForgotPass = this.handleForgotPass.bind(this)
  }

  state = {
    email: '',
    password: '',
    showError: true,
    error: '',
    open: false,
    vertical: 'top',
    horizontal: 'center',
    variant: 'info',
    forgot_pass: false
  }


  componentDidMount () {
    if (auth.loggedIn()) {
        //this.props.url.replaceTo('/index')   // redirect if you're already logged in
        Router.push('/member/dashboard');
        const pro = auth.getProfile();
        subscribeSW(pro);
    }else{
        console.log('Not logged IN');   // redirect if you're already logged in
    }
   
  }

  handleChange = (event, value) => {
      console.log('Chaneg event '+value)
      this.setState({ value });
  };

  toggleError = () => {
    
    this.setState((prevState, props) => {
      console.log('Set Error '+ !prevState.showError)
      return { showError: !prevState.showError }
    })
  };

  toggleForgot = () => {
    
    this.setState({ forgot_pass: true });

  };

  
  handleSubmit (e) {

    const {dispatch} = this.props;
    e.preventDefault();

    dispatch(toggleLoading(true));
    NProgress.start();
    auth.login(this.state.email,this.state.password)
      .then(res => {

        if(res.success){
            Router.push('/member/dashboard');
            dispatch(setLogin(true));
            dispatch(toggleLoading(false));
            
            NProgress.done();
            const pro = auth.getProfile();
            dispatch(setMember(pro));
            subscribeSW(pro);
            dispatch(toggleLoading(false));
        }else{
            //console.log(res)
            //Show Error
            dispatch(enqueueSnackbar({message: res.error,options: {variant: 'error'}}));
            dispatch(toggleLoading(false));
            NProgress.done();
        }
        
      })
      .catch(e => {
          //console.log(e);
          NProgress.done();
      })  // you would show/hide error messages with component state here 
  }

  handleForgotPass (e) {
   
    const {dispatch} = this.props;
    e.preventDefault();

    dispatch(toggleLoading(true));
    NProgress.start();
    auth.forgotPass(this.state.email)
      .then(res => {

        if(res.success){
            this.setState({ email: '' })
            dispatch(setLogin(true));
            dispatch(toggleLoading(false));
            NProgress.done();
            dispatch(enqueueSnackbar({message: res.msg,options: {variant: 'success'}}));
        }else{
            //console.log(res)
            //Show Error
            dispatch(enqueueSnackbar({message: res.error,options: {variant: 'error'}}));
            dispatch(toggleLoading(false));
            NProgress.done();
        }
        
      })
      .catch(e => {
          //console.log(e);
          NProgress.done();
      })  // you would show/hide error messages with component state here 
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render(){
    const { classes } = this.props;
    const { vertical, horizontal, open, variant } = this.state;
    return (
        <main className={classes.main}>
          <CssBaseline />

          { !this.state.forgot_pass ? 
            <Paper className={classes.paper}>
              <img width="100" className={classes.logo} src="/static/images/logo_small.png" alt="logo" />
              <form className={classes.form}  onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input id="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })}  name="email" autoComplete="email" autoFocus ref="email"/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input name="password"  onChange={e => this.setState({ password: e.target.value })}  type="password" id="password" autoComplete="current-password" ref="password"/>
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={this.props.loading}
                >
                  Sign in
                </Button>
                
                <Button 
                  size="small"
                  variant="text"
                  className={classes.forgotLink}
                  onClick={this.toggleForgot}
                >Forgot Password?</Button>
               
              </form>
              <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                
              </Avatar>
            </Paper>

            :

            <Paper className={classes.paper}>
              <img width="100" className={classes.logo} src="/static/images/logo_small.png" alt="logo" />
              <form className={classes.form}  onSubmit={this.handleForgotPass}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input id="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })}  name="email" autoComplete="email" autoFocus ref="email"/>
                </FormControl>
                
                <Button
                  //onClick={this.handleForgotPass}
                  //onSubmit={this.handleForgotPass}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={this.props.loading}
                >
                  Reset Password
                </Button>
                
                
               
              </form>
              <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                
              </Avatar>
            </Paper>

          }
        </main>
      );

  }

}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(state => state),
)(SignIn);

//export default withStyles(styles)withSnackbar(SignIn);