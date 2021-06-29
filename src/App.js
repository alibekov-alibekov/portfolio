import './App.css';
import React, { lazy, Suspense } from 'react';
import NavigationBar from './components/NavigationBar';
import SideBar from './components/SideBar';
// import { Content } from './components/Content';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import Contacts from './services/Contacts';
const All = lazy(()=> import('./pages/All'))
const Family = lazy(()=> import('./pages/Family'))
const Friends = lazy(()=> import('./pages/Friends'))
const Favourites = lazy(()=> import('./pages/Favourites'))
const Login  = lazy(()=> import('./pages/Login'));

function App() {
  const [searchText, setSearchText ] = React.useState('');
  const [auth, setAuth] = React.useState(window.localStorage.getItem('email'));

  
  return (
    <div>
      <NavigationBar setSearchText={setSearchText} setAuth={setAuth} />
      
      <Suspense fallback={<h1 className='text-center'>loading...</h1>}>
       <BrowserRouter>
       <SideBar />
      <Switch>
        {
          auth ? 
          <>
           <Route exact path='/' render={()=> <All contacts={Contacts}  searchText={searchText}/>} />
            <Route exact path='/family' render={()=> <Family contacts={Contacts} searchText={searchText} />} />
            <Route exact path='/friends' render={()=> <Friends contacts={Contacts}  searchText={searchText} />} />
            <Route exact path='/favourites' render={()=> <Favourites contacts={Contacts}  searchText={searchText}/>} />
          </> :
          <Route exact path='/' render={()=> <Login setAuth={setAuth} /> }/>
        }
      </Switch>
      
      </BrowserRouter>
      </Suspense>
      
    </div>
  );
}

export default App;
