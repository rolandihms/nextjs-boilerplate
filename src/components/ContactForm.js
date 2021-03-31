import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { toggleLoading,enqueueSnackbar } from '../actions/index';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import NProgress from 'nprogress';

var SimpleReactValidator = require('simple-react-validator');
//Content-Methods / Functions
import {submitEnquiry} from '../lib/content-methods';

const styles = theme => ({
    button: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit,
    },
  });

class ContactForm extends React.Component {
  
  state = {
    first_name: '',
    last_name: '',
    contact_number: '',
    email: '',
    message: ''
  };
  componentWillMount= (event, value) => {
        this.validator = new SimpleReactValidator();

  }
  handleChange = (event, value) => {

        const {dispatch} = this.props;
        this.setState({ [event.target.name] : event.target.value});
  }

  handleSubmit = async (event, value) => {
        console.log('Submit Enquiry!!!!!!!!');

        const {dispatch} = this.props;
        console.log(this.state);

        if (this.validator.allValid()) {
            NProgress.start();
            dispatch(toggleLoading(true));
            var postD = this.state;
            postD.type = 'submit_enquiry';
            const res = await submitEnquiry(postD);
            console.log(res);
            dispatch(toggleLoading(false));
            NProgress.done();
            if(res.success){
                //Show Success
                dispatch(enqueueSnackbar({message: res.msg.toString(),options: {variant: 'success'}}));
                this.setState({
                    first_name: '',
                    last_name: '',
                    contact_number: '',
                    email: '',
                    message: ''
                });
            }else{
                //Show Error
                dispatch(enqueueSnackbar({message: res.msg.toString(),options: {variant: 'error'}}));
            }
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }


    
    //dispatch(setMemberRegistration(this.state));
  }
  render(){
      const {classes} = this.props;
        return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
            Submit Your Enquiry
            </Typography>
            <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="first_name"
                    name="first_name"
                    label="First name"
                    fullWidth
                    autoComplete="first_name"
                    onChange={this.handleChange}
                    value={this.state.first_name}
                />
                <Typography variant="caption" color="error">
                    {this.validator.message('first_name', this.state.first_name, 'required|alpha')}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="last_name"
                    name="last_name"
                    label="Last name"
                    fullWidth
                    autoComplete="last_name"
                    onChange={this.handleChange}
                    value={this.state.last_name}
                />
                <Typography variant="caption" color="error">
                    {this.validator.message('last_name', this.state.last_name, 'required|string')}
                </Typography>
            </Grid>

            
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="contact_number"
                    name="contact_number"
                    label="Mobile Number"
                    fullWidth
                    autoComplete=""
                    onChange={this.handleChange}
                    value={this.state.contact_number}
                />
                <Typography variant="caption" color="error">
                    {this.validator.message('contact_number', this.state.contact_number, 'required|numeric|min:9|max:12')}
                </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="email"
                    name="email"
                    label="Email Address"
                    fullWidth
                    onChange={this.handleChange}
                    value={this.state.email}
                />
                <Typography variant="caption" color="error">
                    {this.validator.message('email', this.state.email, 'required|email')}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="message"
                    name="message"
                    label="Your Message"
                    multiline={true}
                    rows={2}
                    rowsMax={4}
                    fullWidth
                    onChange={this.handleChange}
                    value={this.state.message}
                />
                <Typography variant="caption" color="error">
                    {this.validator.message('message', this.state.message, 'required|string')}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <FormControlLabel
                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                    label="I am Human"
                />
                
            </Grid>
            <Grid item xs={8} align="right">
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={this.props.loading}
                        onClick={this.handleSubmit }
                        className={classes.button}
                    >
                    Submit
                    </Button>
            </Grid>
                    
            </Grid>
        </React.Fragment>
    );
  }
  
}

export default compose(
    withStyles(styles),
    connect(state => state),
  )(ContactForm);

