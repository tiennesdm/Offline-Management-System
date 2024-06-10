import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
const apiUrl = process.env.API_URL;
const httpLink = new HttpLink({
  uri: apiUrl,
  headers: {
    "keep-alive": "true"
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
