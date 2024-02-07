import { Detail, Form, Home, Landing } from './views/index';
import NavBar from './components/NavBar/NavBar';
import { Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();                                   //Este hook me da info de la ruta donde estoy parado
  return (
    <div className='App'>
      {location.pathname !== '/' && <NavBar />}                     {/*Para mostrar la NavBar en todas las views menos en Landing*/}
      <Route path='/detail/:id' render={() => <Detail />} />
      <Route path='/create' render={() => <Form />} />
      <Route path='/home' render={() => <Home />} />

      <Route exact path='/' component={Landing} />                  {/*La desventaja de definir rutas así es que no se puede pasarle props*/}
    </div>
  );
}

export default App;
