import { Popup, Marker } from "react-leaflet"
import { LatLng, LeafletEventHandlerFnMap } from "leaflet";
import { useRef } from "react";


import L from 'leaflet';

const icon = L.icon({  
  iconAnchor: [16, 37], 
  iconUrl: "/images/marker-icon.png" });

L.Marker.prototype.options.icon = icon;

interface LocationMarkerProps {
  idx: number
  position:LatLng
  updatePosOnDrag: any 
}
export default function LocationMarker({idx, position, updatePosOnDrag}:LocationMarkerProps) {
 
  return position === undefined ? null : (
    <Marker
      draggable={true}
      eventHandlers={{
        moveend: (event) => {
          updatePosOnDrag(idx,event.target.getLatLng());
        }
      }}
      position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}