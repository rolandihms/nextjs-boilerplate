import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { setMember, setMemberRegistration } from '../../../actions/index';


class MemberFormUpdate extends React.Component {

    state = {
        first_name: this.props.member.member.first_name,
        last_name: '',
        contact_number: '',
        email: '',
        street: '',
        address: '',
        city: '',
        region: '',
        country: '',
        post_code: '',
        referal_name: '',
        referrer_name: ''
    };


    componentDidMount() {
        const { dispatch } = this.props;
        //const user = this.props.auth.getProfile();
        console.log('Comp Mounted MemberForm')
        console.log(this.props);
        this.setState(this.props.member.member);
        // this.state = this.props.member.member;
        //this.state =
        // dispatch(setMember(user));
        // if(typeof user === 'object'){
        //     this.state = user;
        //     console.log('OBJECTS');
        //     console.log(this.props.member.member)
        // }

    }
    handleChange = (event, value) => {

        const { dispatch } = this.props;
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({ [event.target.name]: event.target.value });

        console.log(this.state);
        dispatch(setMemberRegistration(this.state));
        dispatch(setMember(this.state));
    }

    render() {

        //console.log('+++++++++++++++++++++++++++++++++');
        ///console.log(this.props);
        console.log('MEMBER FORM RENDER++++++++++++++++++');
        console.log(this.props.member)
        if(this.props.member){
            //this.setState(this.props.member.member)
        }

        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Personal Details
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
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="Residential Address"
                            fullWidth
                            autoComplete="billing address-line1"
                            onChange={this.handleChange}
                            value={this.state.address}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="post_code"
                            name="post_code"
                            label="Postal Address"
                            fullWidth
                            autoComplete="billing address-line2"
                            onChange={this.handleChange}
                            value={this.state.post_code}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            autoComplete="billing address-level2"
                            onChange={this.handleChange}
                            value={this.state.city}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="region" name="region" label="State/Province/Region" fullWidth onChange={this.handleChange} />
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            label="Country"
                            fullWidth
                            autoComplete="billing country"
                            onChange={this.handleChange}
                            value={this.state.country}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email Address"
                            fullWidth
                            onChange={this.handleChange}
                            onKeyUp={this.handleChange}
                            value={this.state.email}
                        />
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

                </Grid>
            </React.Fragment>
        );
    }

}
export default connect(state => state)(MemberFormUpdate); 
