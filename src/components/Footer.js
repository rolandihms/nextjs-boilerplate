
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Link, Router } from '../routes';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import MailIcon from '@material-ui/icons/Mail';

const styles = theme => ({
    footer: {
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        minHeight:400,
        marginTop:60,
    },
    disclaimer: {
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        padding:5,
        alignItems:'center',
        textAlign: 'center',
        flexDirection:'row',
        justifyContent: 'center'
    },
    layout: {
        width: 'auto',
        marginTop:20,
        marginBottom:20,
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.up(1200 + theme.spacing(4))]: {
          width: 1200,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    card: {
    display: 'flex',
  },
  disclaimerLinks: {
    color:'#ffffff',
    fontFamily: 'Roboto, sans-serif',

    fontSize: 12,
    cursor: 'pointer',
    textDecoration: 'none',
     '&:hover': {
      color: theme.palette.primary.main
   }
  },
  footerLinks: {
    color:'#ffffff',
    fontFamily: 'Roboto, sans-serif',
    lineHeight: 2,
    marginBottom:10,
    fontSize: 15,
    cursor: 'pointer',
    textDecoration: 'none',
     '&:hover': {
      color: theme.palette.secondary.main
   }
  },
  footerLinksUl:{
      listStyle:'none',
  },
  footerText:{
    color:'#ffffff', 
    marginTop: 10,  
  },
  footerTextsml:{
    color:'#ffffff',
    fontSize:12
  }
});

class  Footer extends React.Component {

    /* static getInitialProps(props) {
      const { req, res, renderPage, isServer = false } = props;
      const ua = useragent.parse(req.headers['user-agent']); // here

      return { useragent: ua };
    } */
    renderSubMenu = (menu) => {
        const { classes  } = this.props;
        return menu.map(menuItem => {
            var slug = menuItem.slug.split('/');
            if(typeof menuItem.children === 'object'){
                return (
                    <ul className={classes.footerLinksUl} key={'sub_daddy_'+menuItem.menu_id+Math.random(99999,999999)} >
                        {this.renderSubMenu(menuItem.children)}
                         
                    </ul>
                );
            }else{
                return (
                    <li key={'sub_dad_'+menuItem.menu_id+Math.random(9999,9999)}>
                        <Link 
                            href={'/'+slug[0]+'?slug='+slug[1]} as={'/'+menuItem.slug}>
                            <a className={classes.footerLinks}>{menuItem.title}</a>
                        </Link>
                    </li>
                  
                );
            }
        });

    }


    renderMenuItems = (position) => {
        const { menuItems, classes , router } = this.props;
        
        var menu = this.props.general.menu;
        if(typeof menu.findIndex === 'function'){
            var index = menu.findIndex(x => x.position === position);
            if(index !== -1){
                var arr = JSON.parse(menu[index].menu);
                return arr.map(menuItem => {
                
                    var slug = menuItem.slug.split('/');
                    if(slug[0] === 'page' || slug[0] === 'post' 
                            || slug[0] === 'package'
                            || slug[0] === 'category'
                        ){
                           var slugStr =  '/'+slug[0]+'?slug='+slug[1];
                    }else{
                        var slugStr =  menuItem.slug;
                    }
                    if(typeof menuItem.children === 'object'){
                        return (
                            <div className={classes.footerLinksUl} key={'top_daddy_'+menuItem.menu_id+Math.random(99999,999999)} >
                                {this.renderSubMenu(menuItem.children)}
                                
                            </div>
                        );
                    }else{
                        return (
                            
                            <li className={classes.footerLinksUl} key={'dad_'+menuItem.menu_id+Math.random(9999,9999)}>
                                <Link href={slugStr} as={slugStr} >
                                    <a className={classes.footerLinks}>{menuItem.title}</a>
                                </Link>
                            </li>
                            
                        );
                    }
                    
                    
                });
            }
        }
       
    };
    render(){
        const { classes } = this.props;
        const sideList1 = (
            <div className={classes.list}>
            
                <List >
                    {this.renderMenuItems('footer_main')}
                </List>
            </div>
        );
        const sideList2 = (
            <div className={classes.list}>
            
                <List >
                    {this.renderMenuItems('footer_secondary')}
                </List>
            </div>
        );
        return (
            <React.Fragment>
                <div className={classes.footer}>
                    <Grid container className={classes.layout} alignItems="flex-start" direction="row">
                        <Grid item xs={6} md={6} lg={2}>
                            <Link href="/" prefetch as="/">
                                <img width="150" src="/static/images/logo_small.png" align="center"  alt="Wanderers" />
                            </Link>
                        </Grid>
                        <Grid item xs={6} md={6} lg={4}>
                            <Typography variant="body1" className={classes.footerText}>
                                Wanderers Sports Club
                            </Typography>
                            <Typography variant="body1" className={classes.footerText}>
                                +264 61 242 069<br />
                                Windhoek Namibia
                            </Typography>
                            <Typography variant="body1" className={classes.footerTextsml}>
                                club@wanderers.org.na
                            </Typography>

                        </Grid>

                        <Grid item xs={6} md={6} lg={3}>
                            {sideList1}
                        </Grid>
                        <Grid item xs={6} md={6} lg={3}>
                            {sideList2}
                        </Grid>
                        <Grid item xs={6} md={6} lg={4} >
                            
                            <Typography variant="h6" className={classes.footerText}>Bar Open</Typography>
                            <Typography variant="caption" className={classes.footerText}>Mon – Thu 14:00-21:00</Typography>
                            <Typography variant="caption" className={classes.footerText}>Fri 12:00-24:00</Typography>
                            <Typography variant="caption" className={classes.footerText}>Sat 10:00 – 24:00</Typography>
                            <Typography variant="caption" className={classes.footerText}>Sun 10:00 – 14:00</Typography>

                        </Grid>
                        <Grid item xs={12} md={6} lg={4}  align="center">
                            <Typography variant="h6" className={classes.footerText}>Office Hours</Typography>
                            <Typography variant="caption" className={classes.footerText}>Monday to Friday: 8h00 – 13h00 and 14h00 – 16h30</Typography>
                            <Link href={'https://www.facebook.com/WanderersOneMillionDollar20172018/'}><a><FacebookIcon style={{'color':'#FFF'}}/></a></Link>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}  align="right">
                            <Typography variant="h6" className={classes.footerText}>Gates Open</Typography>
                            <Typography variant="caption" className={classes.footerText}>Mon – Fri 6:00 – 23:00</Typography>
                            <Typography variant="caption" className={classes.footerText}>Sat 6:00 – 24:00</Typography>
                            <Typography variant="caption" className={classes.footerText}>Sun 7:00 – 16:00</Typography>
                        </Grid>
                    </Grid>  
 
                </div>  
                <div className={classes.disclaimer}>
                    <a href="https://ihms.co/" className={classes.disclaimerLinks}>
                        
                    </a>  
                </div>
            </React.Fragment>
        )
    }
  
}
export default compose(
    withStyles(styles),
    connect(state => state),
 )(Footer);


