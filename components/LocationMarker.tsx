import { Popup, Marker, Tooltip } from "react-leaflet"
import { LatLng, LeafletEventHandlerFnMap } from "leaflet";
import { Dispatch, SetStateAction, useRef } from "react";


import L from 'leaflet';


const runnerIcon = L.icon({
    iconUrl: 'icons/runner.png',
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [16,38], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -28] // point from which the popup should open relative to the iconAnchor
});


//TODO should consider adding custom icon as parameter.
// also maybe LocationMarker should hold its position? how would the parent code change?
interface LocationMarkerProps {
  idx: number
  position:LatLng
  updatePosOnDrag: any 
  onRemove: any
  setPopupOpen: Dispatch<SetStateAction<boolean>>
}

export default function LocationMarker({idx, position, updatePosOnDrag, onRemove, setPopupOpen}:LocationMarkerProps) {
  return position === undefined ? null : (
    <Marker
      icon = {runnerIcon}
      draggable={true}
      eventHandlers={{
        moveend: (event) => {
          updatePosOnDrag(idx,event.target.getLatLng());
        }
      }}
      position={position}>
      <Popup 
        eventHandlers={
          {
            add: () => { console.log("popup open!"); setPopupOpen(true)},
            remove: () => { console.log("popup close!"); setPopupOpen(false)},
          }
        }>
          <button onClick={()=>onRemove(idx)}>Remove</button>
        </Popup>
    </Marker>
  )
}
