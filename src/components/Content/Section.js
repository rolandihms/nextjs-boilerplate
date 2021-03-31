import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Parallax, Background } from 'react-parallax';


const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
          },
    },
    content: {
        width: 'auto',
        minHeight: 300,
        maxHeight: 500,
        overflow: 'hidden',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(1200 + theme.spacing.unit * 2 * 2)]: {
            width: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
          },
    },
    content_style:{
        fontFamily: 'Roboto, sans-serif',
        color: theme.palette.primary.main,

    }
  });
class Section extends React.Component {  
    state = { 
        expanded: false,
        image: process.env.IA_ASSETS_PATH+'/assets/images/' 
    };
    componentDidMount () {
        const { dispatch } = this.props
        //console.log('Setion Component Mounted: '+this.props.content.cont_id + ' ttype: '+this.props.content.content_type)
    }

    render(){
        const { classes } = this.props;
        var image = '';
        if(this.props.content.content_type != 7){
            return null;
        }
        if(typeof this.props.content.images !== 'undefined'){
            /* console.log('Component has image');
            console.log(JSON.parse(this.props.content.images)) */
            var strA = JSON.parse(this.props.content.images);
            
            if(strA.length > 1){
                //console.log('Multiple image '+strA.url)
                image = strA[0].url;
            }else if(strA.length > 0){
                image = strA[0].url;
                //console.log('Single image '+strA[0].url)
            }else{
                //console.log('No Image');
                return (<div></div>)
            }
            /* console.log('Component image ==> ');
            console.log(strA); */
            //this.setState({'image':image})
        }
        //console.log(this.props.content.content)
        //var cleanHTML = extractButtons(this.props.content.content);
        var cleanHTML = this.props.content.content;
        var cleanBTN = [];
        if(typeof cleanHTML[0].length !== 'undefined'){
            cleanBTN = createButtons(cleanHTML[0]);
            
        }
        
        //console.log(cleanHTML[0])
        return (
            <React.Fragment>       
                <Parallax
                    blur={{ min: -15, max: 15 }}
                    bgImage={image}
                    bgImageAlt={this.props.content.title}
                    strength={-200}
                >
                    <Grid className={classes.content}>
                        <Typography variant="h6" gutterBottom>
                            {this.props.content.title}
                        </Typography>
                        <Typography variant="overline" color="secondary" gutterBottom>
                            {this.props.content.heading}
                        </Typography>
                        <div className={classes.content_style} dangerouslySetInnerHTML={{__html: cleanHTML  }} />
                        {cleanBTN}
                    </Grid>    
                    
                </Parallax>
            </React.Fragment> 
            )
    }
}

function extractButtons(html) {
    //console.log('FINDIIIIIIIIIIIIIIIIIIIING LINKS/BUttons')
    var regex = /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g;   
    var link;
    var buttonA = [];
    
    while((link = regex.exec(html)) !== null) {
        //console.log('Found in HTML: '+link);
        //console.log(link)
        buttonA.push(link);
        html = html.replace(link[0], '');
    }
    var res = [buttonA,html];
    return res;
    
  }
  function createButtons(btns) {
    //console.log('Creating LINKS/BUttons')
    var regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;   
    var link;
    var finalBTNS = [];
    for(var i=0;i<btns.length;i++){
        //console.log('Looping buttons...');
        //console.log(btns[i]);
        var html = btns[i][0]
        var link;
        while((link = regex.exec(html)) !== null) {
            //console.log('FOUND HREF n buttone');
            //console.log(link);
            //console.log('Link TExt: '+link[2]+'  href = '+link[0] + ' another: '+link[1])
            finalBTNS.push(<Button 
                                role="button"
                                id={'btn_'+Math.random(9999,99999)}
                                aria-label={btns[i][2]}
                                variant="contained"
                                color="primary" 
                                key={i+Math.random(999,9999)}
                                >{btns[i][2]}</Button>)
            html = html.replace(link[2], "https://ctrlq.org?redirect_to" + encodeURIComponent(link[2]));
        }
    }
    return finalBTNS;
    
  }
export default withStyles(styles)(Section);