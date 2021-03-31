//Web API content methods
/* 
Roland Ihms
 */

require('isomorphic-fetch');

const api_url = process.env.IA_API_URL;
const bus_id = process.env.IA_BUS_ID;
const app_key = process.env.IA_APP_KEY;
const app_secret = process.env.IA_APP_SECRET;
const backend_url = process.env.IA_BACKEND_URL;
/* 
Get API Token
Pass user/key and secret, receive a token valid for 4 hours
*/
export async function getToken() {
    //get Access Token
    try {
        var token = false;
        //Check if exists in localSTorage
        if (typeof window !== 'undefined') {
            if (window.localStorage) {
                token = JSON.parse(localStorage.getItem('api_token'));

                if(token){
                    //Check if still valid
                    var t = new Date(token.expires);
                    var cNow = new Date();
                    //If expired
                    if(cNow > t){
                        token = null;
                    }
                }else{
                    token = null;
                }
               
            }

        }
        //If no token, go get one and save in local
        if(!token){
            const rawResponse = await fetch(api_url+'/authenticate_app/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({app_key: app_key, app_secret: app_secret})
            });
            var content = await rawResponse.json();
            if(content.success){
                //Save token response in localStorage
                if (typeof window !== 'undefined') {
                    if (window.localStorage) {
                        localStorage.setItem('api_token', JSON.stringify(content));
                    }
                }

                return content;
            }else{
                return content;
            }
        }else{
            return token;
        }


    } catch (e){
        var menu = {
            'success': false,
            'error': e.toString(),
            'token' : ''
        }
        return menu;
    }
}

/* 
Get Settigs 
bus_id
*/
export async function getSettings(param) {
    
    //get {Settings}
    try {
        

        //Get Token for web api requests
        const token = await getToken();
        param['token'] = token.token;
        const res = await fetch(api_url+'/api/v1/settings/?bus_id='+bus_id+'&token='+param['token']);
        var settings = await res.json();
        //console.log(settings)
        if(settings.result){
            settings = settings.result[0];
        }
        
        return settings;

    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }

}


/* 
Get Menu
*/
export async function getMenu(param = {}) {
    //get Menus
    try {
        var esc = encodeURIComponent;
        var query = Object.keys(param)
            .map(k => esc(k) + '=' + esc(param[k]))
            .join('&'); 
        //Get Token for web api requests
        const token = await getToken();
        const menuRes = await fetch(api_url+'/api/v1/menu/?bus_id='+bus_id+'&'+query+'&token='+token.token)
        var menu = await menuRes.json()

        if(menu.result){
            menu = menu.result;
            return menu;
        }
    } catch (e){
        var menu = {
            'error': e.toString()
        }
        return menu;
    }
}
/* 
Get Page
page_template or page_id
*/
export async  function getPage(param) {
    //build query string
    var esc = encodeURIComponent;
    var query = Object.keys(param)
        .map(k => esc(k) + '=' + esc(param[k]))
        .join('&'); 

        //console.log(query);
    //get page
    try {

        //Get Token for web api requests
        const token = await getToken();
        const Page = await fetch(api_url+'/api/v1/page/?bus_id='+bus_id+'&'+query+'&token='+token.token);
        var page = await Page.json()
        var content = '';
        if(page.result){
           content = page.result[0];
           return content;
        }
        return page;
    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }

}

/* 
Get Content
type and type_id
*/
export async  function getContent(param) {
    //get Content
    try {

        //Get Token for web api requests
        const token = await getToken();
        //get Content by type and type_id
        const aContent = await fetch(api_url+'/api/v1/content/?bus_id='+
                                                bus_id+
                                                '&type_id='+param['type_id']+
                                                '&type='+param['type']+
                                                '&token='+token.token
                                    )
        var content = await aContent.json()
       
        if(content.result){
            content = content.result;
        }
        return content;

    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }

}


/* 
Get Package
slug and package_id
*/
export async function getPackage(param) {
    
    //get Content
    try {
        //build query string
        var esc = encodeURIComponent;
        var query = Object.keys(param)
            .map(k => esc(k) + '=' + esc(param[k]))
            .join('&'); 

        //Get Token for web api requests
        const token = await getToken();

        //get Package
        const aPackage = await fetch(api_url+'/api/v1/package/?bus_id='+bus_id+'&'+query+'&token='+token.token);
        var content = await aPackage.json();
        
        if(content.result){
            content = content.result[0];
        }
        return content;

    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }

}
/* 
Get Package
slug and package_id
*/
export async function getPackages(param) {
    
    //get {Packages}
    try {

        //Get Token for web api requests
        const token = await getToken();
        param['token'] = token.token;
        //Add bus_id
        param['bus_id'] = bus_id;
        //Get Packages
        const rawResponse = await fetch(api_url+'/api/v1/packages?token='+param['token'], {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        });
        var content = await rawResponse.json();
        if(content.result){
            content = content.result;
        }
        return content;


    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }

}



/* 
Get Post
slug and post_id
*/
export async function getPost(param) {
    
    //get Content
    try {
        //build query string
        var esc = encodeURIComponent;
        var query = Object.keys(param)
            .map(k => esc(k) + '=' + esc(param[k]))
            .join('&'); 

        //Get Token for web api requests
        const token = await getToken();

        //get Package
        const aPost = await fetch(api_url+'/api/v1/post/?bus_id='+bus_id+'&'+query+'&token='+token.token);
        var content = await aPost.json();
        
        if(content.result){
            content = content.result[0];
        }
        return content;

    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }

}

/* 
Get Posts 
slug , category, pagination
*/
export async function getPosts(param) {
    
    //get {Packages}
    try {
        

        //Get Token for web api requests
        const token = await getToken();
        param['token'] = token.token;
        //Status only Published
        param['status'] = 1;
        //Add bus_id
        param['bus_id'] = bus_id;
        //Get Packages
        const rawResponse = await fetch(api_url+'/api/v1/posts?token='+param['token'], {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        });
        var content = await rawResponse.json();
        if(content.result){
            content = content;
        }
        return content;


    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }

}

/* 
Get Post categories
slug , category, pagination
*/
export async function getPostCategories(param) {
    
    //get {getPostCategories}
    try {
        

        //Get Token for web api requests
        const token = await getToken();
        param['token'] = token.token;
       
        //Add bus_id
        param['bus_id'] = bus_id;
        //Get Packages
        const rawResponse = await fetch(api_url+'/api/v1/post/categories?token='+param['token'], {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        });
        var content = await rawResponse.json();
        if(content.result){
            content = content.result;
        }
        return content;


    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }

}


/* 
Get Galleries 
slug , category, pagination
*/
export async function getGalleries(param) {
    
    //get {Galleries}
    try {
        

        //Get Token for web api requests
        const token = await getToken();
        param['token'] = token.token;
       
        //Add bus_id
        param['bus_id'] = bus_id;
        //Get Packages
        const rawResponse = await fetch(api_url+'/api/v1/galleries?token='+param['token'], {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        });
        var content = await rawResponse.json();
        if(content.result){
            content = content;
        }
        return content;


    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }

}

/* 
Get Iamges 
slug , category, pagination
*/
export async function getImages(param) {
    
    //get {Images}
    try {
        

        //Get Token for web api requests
        const token = await getToken();
        param['token'] = token.token;
       
        //Add bus_id
        param['bus_id'] = bus_id;
        //Get Packages
        const rawResponse = await fetch(api_url+'/api/v1/images?token='+param['token'], {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        });
        var content = await rawResponse.json();
        if(content.result){
            content = content;
        }
        return content;


    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }

}


/* 
Submit Enquiry
get firstname, lastname, email, mobile , message and submit
*/
export async function submitEnquiry(param) {
    
    //post enquiry
    try {

        //Add bus_id
        param['bus_id'] = bus_id;
        param['api_request'] = true;
        //Get Packages
        const rawResponse = await fetch(backend_url+'/api/contact?type='+param['type'], {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        });
        var content = await rawResponse.json();
        if(content.result){
            content = content;
        }
        return content;


    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }

}