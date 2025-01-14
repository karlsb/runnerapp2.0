import { Popup, Marker, Tooltip } from "react-leaflet"
import { LatLng } from "leaflet";
import { useRef } from "react";
import React from "react";


import L from 'leaflet';


const runnerIcon = L.icon({
  iconUrl: 'icons/runner.png',
  iconSize: [38, 38], // size of the icon
  iconAnchor: [16, 38], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -28] // point from which the popup should open relative to the iconAnchor
});


//TODO should consider adding custom icon as parameter.
// also maybe LocationMarker should hold its position? how would the parent code change?
interface LocationMarkerProps {
  idx: number
  position: LatLng
  updatePosOnDrag: any
  onRemove: any
  mapRef: any
}


//TODO Use context for mapRef maybe, depending on if i need it more.
export default function LocationMarker({ idx, position, updatePosOnDrag, onRemove, mapRef }: LocationMarkerProps) {

  const closePopup = (e:any) => {
    if (e.view) {
      //Stop click on popup button from doing map click event. i.e. adding new marker
      e.view.L.DomEvent.stopPropagation(e)
    }
    if (mapRef.current) {
      mapRef.current.closePopup()
    }
  };


  return position === undefined ? null : (
    <Marker
      icon={runnerIcon}
      draggable={true}
      eventHandlers={{
        moveend: (event) => {
          updatePosOnDrag(idx, event.target.getLatLng());
        }
      }}
      position={position}>
      <Popup>
        <button onClick={(e) => { closePopup(e); onRemove(idx) }}>Remove</button>
      </Popup>
    </Marker>
  )
}
