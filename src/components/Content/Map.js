import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps";
import compose from 'recompose/compose';
//const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

  
  class Map extends React.Component { 
    
    state = {
        markers: [],
        isOpen: false,
        activeMarker: null,
        showingInfoWindow: false,
        selectedPlace: null,
        activeWindow: null
    }
    async componentDidMount () {
        const { dispatch } = this.props;
        //console.log('MAP COMPONENT');
        //console.log(this.props);
    }
    
    onMarkerClick = (id) => {
        this.setState({
          
          showingInfoWindow: true,
          activeWindow: id
        });
    };

    showDetails = place => {
        console.log(place);
    };


    render(){
        const { dispatch } = this.props;

        var that = this;
        var markersA = JSON.parse(this.props.content.markers);
        const bounds = new window.google.maps.LatLngBounds();
        var finalM = markersA.map(function(e){
            bounds.extend(new window.google.maps.LatLng(
              e.coords.lat,
              e.coords.lng
            ));
            return (
                <Marker key={that.props.content.cont_id+e.id} position={{ lat: e.coords.lat, lng:  e.coords.lng }} 
                    place_={e}
                    defaultAnimation={'bounce'}
                    onClick={() => that.onMarkerClick(e.id)} 
                >
                    {that.state.activeWindow == e.id &&
                        <InfoWindow ><div><h4>{e.title}</h4><div dangerouslySetInnerHTML={{__html: e.infowindow}}></div></div></InfoWindow>
                    }
                </Marker>
            )
        })

        return (

            <GoogleMap
                zoom={12}
                defaultCenter={{ lat: -22.565220, lng: 17.084299 }}
                //ref={map => map && map.fitBounds(bounds)}
                //center={this.state.center}
            >
                
                {finalM}

                {/* <InfoBox
                    defaultPosition={new google.maps.LatLng(-34.397,150.644 )}
                    options={{ closeBoxURL: ``, enableEventPropagation: true }}
                    >
                    <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                        Hello, Taipei!
                        </div>
                    </div>
                </InfoBox> */}

                
            </GoogleMap>
        )
    }

  }

export default withScriptjs(withGoogleMap(Map));