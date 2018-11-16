import React, { Component } from 'react'
import {View,TextInput,StyleSheet,Button} from 'react-native';

export default class PlaceInput extends Component {
    state = {
        placeName:""
      };

      componentDidMount(){

      }
      
      placeNameChangedHandler = val =>{
        this.setState({
          placeName:val
        });
      };
      placeSubmitHandler=()=>{
        if(this.state.placeName.trim() === ""){
          return;
        }
        this.props.onPlaceAdded(this.state.placeName);
      };
  render() {
    return (
        <View style={styles.inputContainer}>
        <TextInput  style={styles.placeinput}
         value={this.state.placeName}
         placeholder="An awasome place"
          onChangeText={this.placeNameChangedHandler}  />
          <Button title="ADD" style={styles.placeButton} 
            onPress={this.placeSubmitHandler} />
        </View>
    )
  }
}
const styles=StyleSheet.create({
    inputContainer:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
      },
      placeinput:{
        width:"70%"
      },
      placeButton:{
        width:"30%"
      },
})