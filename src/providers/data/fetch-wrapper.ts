import { GraphQLFormattedError } from "graphql";


type Error = {
    message: string, 
    statusCode: string;
} 

/* 
User logs in, and a JWT token is stored in localStorage.
When making API requests (like fetching customer data), 
the custom fetch function automatically adds the token to the Authorization header.
Error handling (for GraphQL or network errors) is managed centrally through fetchWrapper,
which parses the errors and throws standardized messages.
On success, the data is returned and processed in the application.
*/


const customFetch = async (url: string, options: RequestInit) => {

    const accessToken = localStorage.getItem('access_token');

    const headers = options.headers as Record<string, string>;

    return await fetch(url, {
        ...options,
        headers: {
            ...headers,
            Authorization: headers?.Authorization || `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Apollo-Require-Preflight': 'true'

        } 
    }) 
}

const getGraphQLErrors = (body:Record<'errors', GraphQLFormattedError[] | undefined >):  
Error | null => {
    if(!body){
       return { 
        message: 'Unknown error', 
        statusCode: 'INTERNAL_SERVER_ERROR'
       }
    } 
    if('errors' in body){ 
        const errors = body?.errors; 

        const messages = errors?.map((error) => error?.message).join(''); 
        const code = errors?.[0]?.extensions?.code;  

        return { 
            message: messages || JSON.stringify(errors),  
            statusCode: code?.toString() || '500'
        }
    }  
    return null;
}

export const fetchWrapper = async (url: string, options:RequestInit) => { 
 
    const response = await customFetch(url, options);

    const responseClone =  response.clone();  
    const body = await responseClone.json();  
     
    const error = getGraphQLErrors(body);
     
    if(error) {
        throw error; 
    }
    return response;
}