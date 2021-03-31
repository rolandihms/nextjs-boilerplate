import React from 'react';
import App  from 'next/app';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { Provider } from 'react-redux';
import withReduxStore from '../src/lib/with-redux-store';
import { SnackbarProvider } from 'notistack';
//import { useStore } from '../store'
class MyApp extends App {
 
  render () {
   
    const { Component, pageProps, reduxStore  } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <Provider store={reduxStore}> 
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
                  <Component pageContext={this.pageContext} {...pageProps} />
              </SnackbarProvider>
          </ThemeProvider>
        </Provider>
      </React.Fragment>
    );
  }
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default withReduxStore(MyApp)