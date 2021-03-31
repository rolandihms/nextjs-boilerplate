import React from 'react';
import dynamic from 'next/dynamic'
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
//Content-Methods / Functions
import { apiRoute } from '../src/lib/content-methods-client';
//Content-Methods / Functions
import { getMenu, getPage, getContent, getSettings, getToken, getPosts } from '../src/lib/content-methods';

//import ProTip from '../src/ProTip';
import Link from '../src/components/Link';
//import SearchAppBar from '../src/components/SearchAppBar';
const SearchAppBar = dynamic(() => import('../src/components/SearchAppBar'));
//import MenuDrawer from '../src/components/MenuDrawer';
const MenuDrawer = dynamic(() => import('../src/components/MenuDrawer'));

class Index extends React.Component {
  async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    console.log('In _APP getInitialProps +++++++++++++')
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  async componentDidMount() {
    console.log('Index Component Did Mount env')
    console.log(this.props);
    const { dispatch } = this.props;

  }

  render() {
    const { classes } = this.props;
    return (
      <Container >
        <SearchAppBar />
        <MenuDrawer />
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
              </Typography>
          <Button variant="contained" color="primary" component={Link} naked href="/mui">
            Go to the MUI
              </Button>
        
        </Box>
      </Container>
    );
  }
}

// Index.getInitialProps = async function (context) {
//   const { req, query, res, asPath, pathname } = context;
//   if (req) {
//     let host = req.headers.host // will give you localhost:3000
//     console.log('HAS HOST!!!!!!!!!!!!! '+host)
//   }
//   //Get Settings and Menu on Server
//   console.log('getInitialProps Index Page');
//   console.log('Index Component Did Mount env')
//   //console.log(process.env);
//   const { id } = context.query;
//   const { env } = context.query;
  
//   //console.log(env)
//   const data = await apiRoute({'route':'settings'});
//   console.log(data);
//   if (!data) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }
//   return { data, env }
// }

export async function getStaticProps (context) {

  //Get Settings and Menu on Server
  console.log('getStaticProps Index Page');
  const data = await getSettings({});
  console.log(data);
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { data: data }, // will be passed to the page component as props
  }
}

export default compose(

  connect(state => state),
)(Index);