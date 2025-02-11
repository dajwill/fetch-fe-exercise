import './App.css'
import { Provider } from './components/ui/provider'
import { Route, Switch } from 'wouter'
import Login from './pages/Login'

function App() {

  return (
    <Provider>
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </Provider>
  )
}

export default App
