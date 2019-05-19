import {
      createStackNavigator,
      createAppContainer
    } from 'react-navigation';
import Home from './Home';
import Pagina from './Pagina';
import Orden from './Orden';
import ViewDatos from './ViewDatos';

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Pagina: { screen: Pagina},
  Orden: { screen: Orden},
  ViewDatos: { screen: ViewDatos},
});

const App = createAppContainer(AppNavigator);

export default App;
