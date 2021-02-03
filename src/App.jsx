import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Switch, Route} from 'react-router-dom';
import Nav from './components/Nav/NavContainer';
import Home from './pages/Home';
import Works from './pages/Works';
import About from './pages/About';
import Contact from './pages/Contact';

const routes = [
  {path : '/', component : Home}, 
  {path : '/works', component : Works}, 
  {path : '/about', component : About}, 
  {path : '/contact', component : Contact } 
]

function App() {
  return (
    <div className="App pt-4 ">
      <Nav />
      <Switch>
        {routes.map((route, index) => 
          route.path === '/' ?
            <Route key={index} exact path={route.path} component={route.component} />
            :
            <Route key={index} path={route.path} component={route.component}/>
        )}   
      </Switch>
    </div>
  );
}

export default App;
