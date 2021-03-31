import { withStyles } from '@material-ui/core/styles';
import {
    FacebookShareButton,
    GooglePlusShareButton,
    FacebookShareCount,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
    LinkedinIcon,
    WhatsappIcon,
  } from 'react-share';


const styles = theme => ({
    layout: {
        display: 'flex',
        flexDirection: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    icon:{
        margin: 5,

    }

  });
class SocialSharing extends React.Component {  
    state = { 
        url: window.location.pathname,
        title: '',
        description: '',
        image: '',
    };
    componentDidMount () {
        const { dispatch } = this.props
        var loc = window.location.pathname;

        var title = this.props.detail.title;
        var description = this.props.detail.heading;
        this.setState({
            url: loc,
            title: title,
            description: description
        })
    }

    render(){
        const { classes } = this.props;
        const url = window.location + window.location.search;
        //console.log('URLLL:::: '+url)
        return (

            <div className={classes.layout}>
                
                <FacebookShareButton
                    url={url}
                    quote={this.state.title}
                    className={classes.icon}>
                    <FacebookIcon
                        size={32}
                        round />
                </FacebookShareButton>
                {/* <FacebookShareCount
                    url={url}
                    className="Demo__some-network__share-count">
                    {count => count}
                </FacebookShareCount> */}
                <TwitterShareButton
                    url={url}
                    quote={this.state.title}
                    className={classes.icon}>
                    <TwitterIcon
                        size={32}
                        round />
                </TwitterShareButton>
                <LinkedinShareButton
                    url={url}
                    quote={this.state.title}
                    className={classes.icon}>
                    <LinkedinIcon
                        size={32}
                        round />
                </LinkedinShareButton>
                <GooglePlusShareButton
                    url={url}
                    quote={this.state.title}
                    className={classes.icon}>
                    <GooglePlusIcon
                        size={32}
                        round />
                </GooglePlusShareButton>
                <WhatsappShareButton
                    url={url}
                    quote={this.state.title}
                    className={classes.icon}>
                    <WhatsappIcon
                        size={32}
                        round />
                </WhatsappShareButton>

            </div>

        )
    }
}
export default withStyles(styles)(SocialSharing);