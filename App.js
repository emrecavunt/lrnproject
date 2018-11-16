
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addPlace,deletePlace,selectPlace,deselectPlace} from './src/store/actions/index';
import { StyleSheet, View} from 'react-native';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceImage from './src/assets/ReactNative.png';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

class App extends Component {
  placeAddedHandler=placeName=>{  
    this.props.onAddPlace(placeName);
     };
  placeDeletedHanlder = () =>{
    this.props.onDeletePlace();
  };
  modalClosedHandler = () =>{
    this.props.onDeselectPlace();
  }
  placeSelectedHandler =key => {
    this.props.onSelectedPlace(key);
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail selectedPlace={this.props.selectedPlace}  
        onItemDeleted={this.placeDeletedHanlder} 
        onModalClosed={this.modalClosedHandler} />
       <PlaceInput onPlaceAdded={this.placeAddedHandler} />
       <PlaceList  places={this.props.places} onItemSelected={this.placeSelectedHandler} /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:26,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const mapStateToProps= state=>{
  return {
    places:state.places.places,
    selectedPlace:state.places.selectedPlace
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    onAddPlace:(name)=>dispatch(addPlace(name)),
    onDeletePlace:()=>dispatch(deletePlace()),
    onSelectedPlace: key =>dispatch(selectPlace(key)),
    onDeselectPlace:() => dispatch(deselectPlace())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);