import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const authLink = setContext((_,{Headers})=> {
  const token = localStorage.getItem('id_token')
  return {
    headers: {
      ...Headers,
      authorization: token ? `Bearer ${token}`: '',
    }
  }
});

const graphqlLink = createHttpLink({
  uri: '/graphql'
});

const client = new ApolloClient({
  link: authLink.concat(graphqlLink),
  cache: new InMemoryCache()
})

function App() {
  return (
  <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  </ApolloProvider>  
  );
}

export default App;
