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
Api Route
bus_id
*/
export async function apiRoute(param) {
    
    return new Promise(async (resolve, reject) => {
        console.log('API ROUTE '+bus_id+' '+app_key);
        console.log(bus_id , app_key);
        //console.log(process.env)
        //get {Settings}
        try {
            const res = await fetch('http://localhost:5555/api/'+param.route)
            const data = await res.json();
            console.log('+++++++++++++++++++++++++');
            console.log(data)
            console.log('+++++++++++++++++++++++++');
            return resolve(data);

        }catch (e) {
            var content = {
                'error': e.toString()
            }
            console.log('++++++++++++ERROR+++++++++++++');
            console.log(content)
            console.log('+++++++++++++ERROR++++++++++++');
            return resolve(content);
        }
    });
}

