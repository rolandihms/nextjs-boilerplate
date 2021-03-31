import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux'
import { setMemberRegistration } from '../../../actions/index';
import  MemberForm  from './MemberForm';
import AuthService from '../../../lib/auth-service'
const auth = new AuthService(process.env.IA_BACKEND_URL);

class Step1 extends React.Component {
  
  state = {
    first_name: '',
    last_name: '',
    contact_number: '',
    email: '',
    street: '',
    address: '',
    city: '',
    region: '',
    country: '',
    post_code: '',
    referrer_name: '',
    referal_number: ''
  };

  handleChange = (event, value) => {

      const {dispatch} = this.props;
      console.log(event.target.name);
      console.log(event.target.value);
      this.setState({ [event.target.name] : event.target.value});

      console.log(this.state);
      dispatch(setMemberRegistration(this.state));
  }

  render(){
    return (
      <React.Fragment>
        
        <Grid container spacing={24}>
          <Grid item xs={12}>
              <MemberForm member={{'member':this.state}} auth={auth}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                  required
                  id="referrer_name"
                  name="referrer_name"
                  label="Club Referal"
                  fullWidth
                  autoComplete=""
                  onChange={this.handleChange}
                  value={this.state.referrer_name}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                  required
                  id="referal_number"
                  name="referal_number"
                  label="Referal Contact Number"
                  fullWidth
                  autoComplete="off"
                  onChange={this.handleChange}
                  value={this.state.referal_number}
              />
          </Grid>
          <Grid item xs={12}>
              <Typography variant="caption" gutterBottom>
                  Club Referal, the person who referred or invited you.
              </Typography>
          </Grid>
         
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="These details are correct"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  
}
export default connect(state => state)(Step1); 
