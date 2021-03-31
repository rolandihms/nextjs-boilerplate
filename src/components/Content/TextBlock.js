import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import Typography from '@material-ui/core/Typography';

const api_url = process.env.IA_API_URL || '';
const IA_BACKEND_URL = process.env.IA_BACKEND_URL || ''; 
const IA_ASSETS_PATH = process.env.IA_ASSETS_PATH || ''; 

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(1000 + theme.spacing.unit * 2 * 2)]: {
          width: 1000,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    content_style:{
        fontFamily: 'Roboto, sans-serif',
        color: theme.palette.primary.main,

    }

  });
class TextBlock extends React.Component {  
    state = { 
        expanded: false,
        image: IA_ASSETS_PATH+'/assets/images/' 
    };
    componentDidMount () {
        const { dispatch } = this.props
        
    }

    render(){
        const { classes } = this.props;
        const props = {
            dangerouslySetInnerHTML: { __html: this.props.content.content },
        };
        return (

            <div className={classes.layout}>
                <Typography variant="h6" gutterBottom>
                    {this.props.content.title}
                </Typography>
                <Typography variant="overline" color="secondary" gutterBottom>
                    {this.props.content.heading}
                </Typography>
                
                <div className={classes.content_style} dangerouslySetInnerHTML={{__html: this.props.content.content}} />
             
            </div>

        )
    }
}
export default withStyles(styles)(TextBlock);