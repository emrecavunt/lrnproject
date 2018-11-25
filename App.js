import {Navigation} from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth'

Navigation.registerComponent("awesome-places.AuthScreen",() => AuthScreen);

Navigation.startSingleScreenApp({
    screen:{
        screen:"awesome-places.AuthScreen",
        title:"Login"
    }
});