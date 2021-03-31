import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import NProgress from 'nprogress';

import {subscribeSW, getTicket } from '../lib/member-methods';

import {enqueueSnackbar, toggleLoading} from '../actions/index';



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
  avatar:{
    width:60,
    height:60,
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  }
});


class TicketLookup extends React.Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state = {
    ticket_no: '',
    ticket: false,
    ticket_owner: null,
    has_owner: false,
    password: '',
    showError: true,
    error: '',
    open: false,
    vertical: 'top',
    horizontal: 'center',
    variant: 'info'
  }


  componentDidMount () {
   
   
  }


  async handleSubmit(e) {

    const {dispatch} = this.props;
    e.preventDefault();

    dispatch(toggleLoading(true));
    NProgress.start();
    const ticket = await getTicket({'ticket_no':this.state.ticket_no});
    NProgress.done();
    dispatch(toggleLoading(false));
    console.log(ticket)
    if(typeof ticket.error === 'undefined'){
      if(ticket.success){
        //set ticket state and show ticket
        var t =  ticket.ticket[0];
        var nameA = t.ticket_owner.split(' ');
        console.log(t.ticket_owner.length)
        if(t.ticket_owner.length > 0){
          t.has_owner = true;
          this.setState({has_owner: true});
        }else{
          t.has_owner = false;
          this.setState({has_owner: false});
        }
        console.log(this.state.has_owner);
        t.avatar = nameA.map(function(e){
           return e.substr(0,1);
        });
        this.setState({ticket: t});
        dispatch(enqueueSnackbar({message: 'Ticket Found',options: {variant: 'success'}}));
        console.log(this.state);
      }else{
         //Show Error
        dispatch(enqueueSnackbar({message: ticket.msg,options: {variant: 'error'}}));
      }
      

    }else{
      //Show Error
      dispatch(enqueueSnackbar({message: ticket.error,options: {variant: 'error'}}));

    }
  }
  reset = () => {
    this.setState({ ticket: false });
  };


  render(){
    const { classes } = this.props;
    
    return (
        <main className={classes.main}>
          <CssBaseline />
            {this.state.ticket ? 
              <Paper className={`slideInDown animated in faster ${classes.paper}`}>
                <Grid container >
                  <Grid item xs={9}>
                    <Typography variant="h4">
                      #{this.state.ticket.ticket_no}
                    </Typography>
                    <Typography variant="body1">
                      {this.state.ticket.ticket_owner}<br />
                      {this.state.ticket.title}
                    </Typography>
                    <Typography variant="body1">
                      {this.state.ticket.created_at.substr(0,10)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} align="right">
                    <Avatar className={classes.avatar}>
                      {
                        this.state.ticket.avatar
                      }
                    </Avatar>
                  </Grid>
                </Grid>
                {
                  this.state.has_owner ? 
                    ''
                  : 
                  <Link as={'/contact'} href={'/contact'}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={this.go_contact}
                      className={classes.submit}
                      disabled={this.props.loading}
                    >
                      Contact Us
                    </Button>
                  </Link>

                }
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.reset}
                  className={classes.submit}
                  disabled={this.props.loading}
                >
                  Find Another
                </Button>
              </Paper>
                                
              : 
              
              <Paper className={`slideInDown animated faster ${classes.paper}`}>
                <img width="100" className={classes.logo} src="/static/images/logo_100_small.png" alt="logo" />
                <form className={classes.form}  onSubmit={this.handleSubmit}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="ticket_no">Ticket Number</InputLabel>
                    <Input id="ticket_no" value={this.state.ticket_no} onChange={e => this.setState({ ticket_no: e.target.value })}  name="ticket_no" autoFocus ref="ticket_no"/>
                  </FormControl>
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={this.props.loading}
                  >
                    Find Ticket
                  </Button>
                  
                </form>
                
              </Paper>
            }
        </main>
      );

  }

}

TicketLookup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(state => state),
)(TicketLookup);

//export default withStyles(styles)withSnackbar(SignIn);