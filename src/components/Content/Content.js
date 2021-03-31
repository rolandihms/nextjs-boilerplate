import { withStyles } from '@material-ui/core/styles';

import TextBlock from './TextBlock';
import Section from './Section';
import Gallery from './Gallery';
import Map from './Map';

const google_key = process.env.IA_GOOGLE_MAP_KEY;

const styles = theme => ({
    gallery: {
        maxWidth: '700',
        
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(1000 + theme.spacing.unit * 2 * 2)]: {
            width: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    subheading:{
        color: theme.palette.text.disabled,
        fontSize:'80%',
        maxWidth:'90%'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    
  });

const ContentType = {
    '0' : <TextBlock />,
    '1' : <TextBlock />,//'ImageText',
    '2' : <TextBlock />,//'TextImage',
    '3' : <TextBlock />,//'ImageText',
    '4' : <TextBlock />,//'ImageGallery',
    '5' : <TextBlock />,//'Map',
    '6' : <TextBlock />,//'Video',
    '7' : <Section />
}

class Content extends React.Component {  
    state = { 
        expanded: false,
        image: process.env.IA_ASSETS_PATH+'/assets/images/' 
    };
    componentDidMount () {
        const { dispatch } = this.props
    }
    renderContent(content){
        const { classes } = this.props;

        if(typeof content === 'object'){

            return Object.keys(content).map(function(i){
                //console.log('In Content Loop: type: '+content[i].content_type+ ' Title: '+content[i].cont_id);
                /* if(typeof i !== 'object'){
                    i = content[i];
                } */
                switch (content[i].content_type) {
                    case 0:
                        return (<TextBlock className="content" content={content[i]} key={content[i].cont_id+Math.random(999,99999)} />)
                    case 4:
                        return (
                            <div key={content[i].cont_id} className={classes.gallery} >
                                <Gallery  content={content[i]} hasImages={true} />
                            </div>
                        )
                    case 5:
                        return (
                            <div key={content[i].cont_id}  >
                                <Map content={content[i]} places={content[i]}  isMarkerShown={true} 
                                    googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key='+google_key}
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    containerElement={<div style={{ height: `400px` }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                />
                            </div>
                        )
                    case 7:
                        return (<Section content={content[i]} key={content[i].cont_id+Math.random(999,99999)} />)
                    default:
                        //contentHTML.push(<TextBlock content={content[i]} key={content[i].cont_id+Math.random(999,99999)} />)
                }
            })
            /* for(var i=0;i<content.length;i++){
                //console.log('In Content Loop: type: '+content[i].content_type+ ' Title: '+content[i].title);
                //console.log(content[i].content);
                //var comp = Content.getContentType(content[i].content_type, content[i]);
                switch (content[i].content_type) {
                    case 0:
                        contentHTML.push(<TextBlock content={content[i]} key={content[i].cont_id+Math.random(999,99999)} />)
                    case 4:
                        contentHTML.push(
                            <div key={content[i].cont_id} className={classes.gallery} >
                                <Gallery  content={content[i]} hasImages={true} />
                            </div>
                        )
                    case 7:
                        contentHTML.push(<Section content={content[i]} key={content[i].cont_id+Math.random(999,99999)} />)
                    default:
                        //contentHTML.push(<TextBlock content={content[i]} key={content[i].cont_id+Math.random(999,99999)} />)
                }
            } */
        }
    }
    render(){
        //Build Content according to type
        var content = this.props.content;
        if(content.length == 0){
            return;
        }
        
        return (
            <div>
            {this.renderContent(content)}
            </div>
        )
    }
}



export default withStyles(styles)(Content);