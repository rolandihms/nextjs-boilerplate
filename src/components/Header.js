
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Head from 'next/head'
import NextSeo from 'next-seo'
//import useragent from 'useragent';
import 'react-image-lightbox/style.css';

const google_tag_key = process.env.IA_GOOGLE_TAG_KEY;

class  Header extends React.Component {

    /* static getInitialProps(props) {
      const { req, res, renderPage, isServer = false } = props;
      const ua = useragent.parse(req.headers['user-agent']); // here

      return { useragent: ua };
    } */
    render(){
      const { classes } = this.props;
      //console.log('URL:: '+window.location + window.location.search)
      return (
        <div>
          <NextSeo
            config={{
              title: this.props.seo.title,
              description: this.props.seo.description,
              openGraph: {
                type: 'website',
                locale: 'en_IE',
                url: '',//window.location + window.location.search,
                title: this.props.seo.title,
                description: this.props.seo.description,
                images:[
                  {
                    url : '/static/images/wanderers_logo.png',
                    width: 960,
                    height: 960,
                    alt : this.props.seo.title
                  }
                ],
                site_name: this.props.settings.title,
              }
            }}
          />
          <Head>

            
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="Wanderers" />
            <meta name="apple-mobile-web-app-title" content="Wanderers" />
            <meta name="msapplication-starturl" content="/" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/*   <link rel="apple-touch-icon" sizes="57x57" href="/static/icons/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/static/icons/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/static/icons/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/static/icons/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/static/icons/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/static/icons/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="128x128" href="/static/icons/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/static/icons/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/static/icons/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192"  href="/static/icons/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/static/icons/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" /> */}
            {/* <script
                  src='https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js'
                /> */}

            <link rel="manifest" href="/static/manifest.json" />
            {/* <link href="/static/custom-sw.js" /> */}
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <link rel="favicon" href="/static/favicon.ico" />
            <link rel="icon" href="/static/images/logo_badge_sml.png" />
            <link rel="apple-touch-icon" href="/static/images/logo_badge_sml.png" />
            <link rel="stylesheet" href="/static/css/nprogress.css" />
            <link rel="stylesheet" href="/static/css/animate.css" />
            {/* <link rel="stylesheet" href="/css/video-react.css" /> */}
            {
              google_tag_key && 
                <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-`+google_tag_key+`');`}} />
            }
            
          </Head>
          <noscript dangerouslySetInnerHTML={{__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-`+google_tag_key+`" height="0" width="0" style="display:none;visibility:hidden;"></iframe>`}} />
        </div>  
      )
    }
  
}

export default withRouter(connect(state => state)(Header)); 


