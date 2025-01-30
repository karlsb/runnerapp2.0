import "leaflet/dist/leaflet.css";
import {LatLngExpression, Layer } from "leaflet";
import { LayerGroup, LayersControl, MapContainer,Polyline,TileLayer} from "react-leaflet";
import { LatLng } from "leaflet"

import { Button } from "@material-tailwind/react";

import Route from "./Route";
import { useEffect, useRef, useState} from "react";
import { calcDistance } from "@/helpers/RouteHelpers";



function renderLoginPopup(){

}

function saveToServer(){

}

export default function Map() {
  const mapRef = useRef(null)
  const position: LatLngExpression = [59.325264776484666, 18.07139396667481] //TODO: this should be changed to be your location or in the middle of stockholm or something.
  const [points, setPoints] = useState<LatLng[]>([]);
  const [distance, setDistance] = useState<number>(0)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    setDistance(calcDistance(points))
  },[points])

  const removeLastPoint = () => {
    setPoints((prevState) => prevState.slice(0,0))

  }

  const clearRoute = () => {
    setShowConfirm(false)
    setPoints([])
  }

  const handleSave = () => {
    if(!loggedIn){
      renderLoginPopup()
    }else{
      saveToServer();
    }
  }

  return (
    <div className="h-screen w-screen">
      <div className="absolute p-4 z-10 top-28 left-10 bg-slate-100 rounded-lg">
        <div>
          <span>Distance:</span>
          <span>{distance}</span>
        </div>
        <div>
          <Button color="red" onClick={removeLastPoint}>Remove Last Point</Button>
        </div>
        <div>
          <Button color="red" onClick={() => setShowConfirm(true)}>Clear Route</Button>
          {showConfirm ? <div><button onClick={clearRoute}>confirm</button><button onClick={() => setShowConfirm(false)}>cancel</button></div> : <></>}
        </div>
        <div>
          <Button color="blue" onClick={handleSave}>Save</Button>
        </div>
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
        <Route mapRef={mapRef} state={points} setState={setPoints}/>
      </MapContainer>
    </div>
  );
}