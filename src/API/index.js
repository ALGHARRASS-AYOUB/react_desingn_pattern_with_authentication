

const BASEURL=process.env.REACT_APP_API_URL
//const BASEURL='http://localhost:80'


const endpoints={
    'Auth':'/api',
    'User':'/api/v1/users',
    'Customers':'/api/v1',
    'Invoices':'/api/v1',
}

export function getUrl(endpoint) {
    const URL=BASEURL+endpoints[endpoint];
    return URL;
}

export default endpoints;