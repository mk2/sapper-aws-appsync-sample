import { init } from 'sapper/runtime.js';
import { routes } from './manifest/client.js';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'svelte-apollo';
import { HttpLink } from 'apollo-link-http';
import { Store } from 'svelte/store';
import AWSAppSyncClient from 'aws-appsync';

const options = {
	defaultOptions: {
		watchQuery: {
			fetchQuery: {
				fetchPolicy: 'cache-and-network',
			}
		}
	}
};

const client = new AWSAppSyncClient({
	url: 'https://...',
	region: 'ap-northeast-1',
	auth: {
		type: 'API_KEY',
		apiKey: '...'
	}
}, options);

const graphql = new ApolloProvider({ client });
const store = () => new Store({ graphql });

// `routes` is an array of route objects injected by Sapper
init(document.querySelector('#sapper'), routes, { store });

if (module.hot) module.hot.accept();