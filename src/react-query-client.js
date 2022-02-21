import { QueryClient } from 'react-query';

const client = new QueryClient({
    defaultOPtions: {
        queries: {
            staleTime: 500,
            cacheTime: 1000
        }
    }
});

export default client;