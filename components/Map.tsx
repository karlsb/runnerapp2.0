import "leaflet/dist/leaflet.css";
import {LatLngExpression, Layer } from "leaflet";
import { LayerGroup, LayersControl, MapContainer,Polyline,TileLayer} from "react-leaflet";

import Route from "./Route";
import { useRef } from "react";
import SideMenu from "./SideMenu";

export default function Map() {
  const mapRef = useRef(null)
  const position: LatLngExpression = [59.325264776484666, 18.07139396667481] //TODO: this should be changed to be your location or in the middle of stockholm or something.
  return (
    <div className="h-screen w-screen">
      <div className="absolute z-10 w-24 h-24 top-10 left-10">
        <button className="bg-red-200 font-bold">Hello There!</button>
      </div>
      <MapContainer
        ref={mapRef}
        center={position}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex:0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Route mapRef={mapRef} />
      </MapContainer>
    </div>
  );
}