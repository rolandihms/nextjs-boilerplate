// utils/withAuth.js - a HOC for protected pages
import React, {Component} from 'react';
import AuthService from './auth-service';
import { Link, Router } from '../routes';



export default function withAuth(AuthComponent) {
    const Auth = new AuthService(process.env.IA_BACKEND_URL)
    return class Authenticated extends Component {
      constructor(props) {
        super(props)
        this.state = {
          isLoading: true
        };
      }

      componentDidMount () {
        if (!Auth.loggedIn()) {
          //this.props.url.replaceTo('/member/login');
          Router.push('/member/login')
        }
        this.setState({ isLoading: false })
      }

      render() {
        return (
          <div>
          {this.state.isLoading ? (
              <div>LOADING....</div>
            ) : (
              <AuthComponent {...this.props}  auth={Auth} />
            )}
          </div>
        )
      }
    }
}