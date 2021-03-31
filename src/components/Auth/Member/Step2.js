import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {getMemberTypes} from '../../../lib/member-methods';
import { connect } from 'react-redux'
import { setMemberOptions, enqueueSnackbar } from '../../../actions/index';

class Step2 extends React.Component {

  state = {
     member_options: [],
     selected_options: []
  }
  async componentDidMount(){
      const {dispatch} = this.props;
      var member_types = null;

      //Get member Types
      //Check if localstorge set
      if (typeof window !== 'undefined') {
          //Store locally
          member_types = localStorage.getItem('member_types');
          //set State
          if(typeof member_types === 'string'){
              this.setState({member_options: JSON.parse(member_types)});
          }
          
      }
      if(!member_types){
          member_types = await getMemberTypes({limit: 50});
          if(typeof member_types.error === 'undefined'){
              //set local sttorage
              if (typeof window !== 'undefined') {
                  //Store locally
                  localStorage.setItem('member_types', JSON.stringify(member_types));
              }
              
              //set State
              this.setState({member_options: member_types});

          }else{
            dispatch(enqueueSnackbar(
                {
                  message: mtypes.error.toString(),
                  options: {
                      variant: 'error',
                  },
                }
              )
            )
          }  
      }
      
      
     
      console.log('GOT MEMBER TYPES');
      //console.log(member_types)
  }


  getMemberTypes = (options) => {
        //console.log(typeof options)
        //const options = this.state.member_options;
        console.log(options);
        return options.map(option => {
            
            return (
              <Grid item xs={6} lg={4} key={option.type_id}>
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

  handleCheck = () => {
      const {dispatch} = this.props;
      const options = this.state.selected_options;

      if(event.target.checked){
        options.push({type_id: event.target.value.toString(), title: event.target.name});
      }else{
        var index = options.indexOf(+event.target.value)
        options.splice(index, 1);
      }

      this.setState({ selected_options: options })
      dispatch(setMemberOptions(options)); 
  }

  render(){


    return (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Member Interests
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12} md={12}>
              <TextField required id="member_type" label="Interested In" fullWidth />
            </Grid>
            {this.getMemberTypes(this.state.member_options)}
            
          </Grid>
        </React.Fragment>
      );
  }
}

export default connect(state => state)(Step2); 