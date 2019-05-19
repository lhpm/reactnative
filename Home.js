import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text, View, Button, StatusBar } from 'react-native';
var Realm = require('realm');
let realm;

export default class Home extends React.Component {

  constructor(props){
    super(props);
    realm = new Realm({ path: 'RestPos.realm' });
    var restpos_pedido = realm.objects('restpos_pedido');

    // Creación Base de datos REALM
     realm = new Realm({
      path: 'RestPos.realm',
      schema: [
        {
          name: 'restpos_pedido',
          properties: {
            user_id: { type: 'int', default: 0 },
            user_mesa: 'string',
            user_name: 'string',
            user_precio: 'int',
            user_cantidad: 'int',
            user_fecha: 'date',
          },
        },
      ],
    });
    // FIN Creación Base de datos REALM
    this.state ={
      dataSource: restpos_pedido,
    }
  }

  static navigationOptions = ({navigation}) => {

    let headerTitle = 'REST BAR POS';
    let headerTitleStyle = {color: 'black'};

    return {headerTitle, headerTitleStyle}

  }

  componentDidMount(){

  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
      <StatusBar backgroundColor="#094C72" barStyle="light-content" />
       <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>

        {
          this.props.screenProps.mesasDisponibles.map((mesa, index) => (
        <TouchableOpacity
          style={styles.button}
          key={ mesa }
          onPress={() =>
               this.props.navigation.navigate('Pagina', { lista: `${ mesa }`})
          }
        >
          <Text style={styles.submitText}>{ `${ mesa }` }</Text>
        </TouchableOpacity>
          )
        )
        }
       </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 8
  },
  button: {
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#FFFFFF',
    padding: '2%',
    width: '48%',
    height: 80,
    marginBottom: 10,
    marginRight: '1%',
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  submitText:{
    color:'#000',
    textAlign:'center',
    fontSize: 16,
    textAlignVertical: 'center',
  }
});
