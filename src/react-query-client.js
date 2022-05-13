import { QueryClient } from 'react-query';

const client = new QueryClient({
    defaultOPtions: {
        queries: {
            staleTime: 10000,
            cacheTime: 10000
        }
    }
});

export default client;