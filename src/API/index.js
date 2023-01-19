

const BASEURL=process.env.REACT_APP_API_URL


const endpoints={
    Auth:'api/',
    User:'api/V1/users',
    Customers:'api/V1',
    Invoices:'api/V1',
}

export function getUrl(endpoint) {
    const URL=BASEURL+endpoints[endpoint];
    return URL;
}

export default endpoints;