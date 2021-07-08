import Login from './components/login/Login'
import ChatApp from './components/app'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import AppProvider from './context/AppProvider'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={ChatApp} />
            </Switch>
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
