 import * as React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import LoginScreen from './src/components/LoginScreen';
 import HomeScreen from './src/components/HomeScreen';
 import PulseiraScreen from './src/components/PulseiraScreen';
 import InfoScreen from './src/components/InfoScreen';
 import NoteScreen from './src/components/NoteScreen';
 import CadastroScreen from './src/components/CadastroScreen';
 import HistoricoScreen from './src/components/HistoricoScreen';

 
 const Stack = createStackNavigator();
 
 export default function App() {
   return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="Login">
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Pulseira" component={PulseiraScreen} />
         <Stack.Screen name="Info" component={InfoScreen} />
         <Stack.Screen name="Note" component={NoteScreen} />
         <Stack.Screen name="Cadastro" component={CadastroScreen} />
         <Stack.Screen name="Historico" component={HistoricoScreen} />
       </Stack.Navigator>
     </NavigationContainer>
   );
 }