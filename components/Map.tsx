import "leaflet/dist/leaflet.css";
import {LatLngExpression } from "leaflet";
import { MapContainer,Polyline,TileLayer} from "react-leaflet";

import Route from "./Route";

export default function Map() {
  const position: LatLngExpression = [59.325264776484666, 18.07139396667481] //TODO: this should be changed to be your location or in the middle of stockholm or something.
  return (
    <div>
      <MapContainer
        center={position}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: "700px", width: "1200px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Route />
      </MapContainer>
    </div>
  );
}