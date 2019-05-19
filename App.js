import React from 'react';
import AppNavigator from './AppNavigator';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posiblePlatos: [
        'Pizza',
        'Hamburger',
        'Sandwich',
      ],
      mesasDisponibles: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'
      ],
      listaPlatos: [],
      datoGenerado: [],
    }
  }

    componentDidMount(){
    fetch('https://luismachadoportafolio.com.co/json_platos.php',{
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
      }
    }).then((respuesta) => respuesta.json())
      .then((respuestaJson) => {

        this.setState({
          isCargando: false,
          datoGenerado: respuestaJson,
          // Cuando dentro del json existe otro array específico ejemplo movies
          //datoGenerado: respuestaJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
    }

  agregarAmigo = (index) => {
    const {
      listaPlatos,
      datoGenerado
    } = this.state

    // Clonamos el arreglo para que no se muta visualmente
    const newposiblePlatos = [...datoGenerado]

    // Extraemos en plato que seleccionan a otro arreglo
    const platoAgregado = newposiblePlatos.splice(index, 1)

    // Y poner platos en platos actuales
    listaPlatos.push(platoAgregado)

    // Por último, actualiza nuestro estado de la aplicación.
    this.setState({
      listaPlatos,
      datoGenerado
    })
  }

  quitarPlato = (index) => {
    const {
      listaPlatos
    } = this.state

    // Extraer amigos de posibles amigos
    const platoQuitado = listaPlatos.splice(index, 1)

    // Por último, actualiza nuestro estado de la aplicación.
    this.setState({
      listaPlatos
    })
  }

  render() {

    return (
      <AppNavigator
        screenProps={ {
          mesasDisponibles: this.state.mesasDisponibles,
          listaPlatos: this.state.listaPlatos,
          posiblePlatos: this.state.posiblePlatos,
          agregarAmigo: this.agregarAmigo,
          quitarPlato: this.quitarPlato,
          datoGenerado: this.state.datoGenerado,
        } }
      />
    );
  }
}
