import "leaflet/dist/leaflet.css";
import {LatLngExpression, Layer } from "leaflet";
import { LayerGroup, LayersControl, MapContainer,Polyline,TileLayer} from "react-leaflet";
import { LatLng } from "leaflet"

import { Button ,Card, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";

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
  const [distance, setDistance] = useState<string>("0")
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const [openPopover, setOpenPopover] = useState(false)

  useEffect(() => {
    setDistance(calcDistance(points).toFixed(2))
  },[points])


  const handleOpen = () => setOpenPopover((cur)=> !cur)

  const removeLastPoint = () => {
    setPoints((prevState) => prevState.slice(0,-1))

  }

  const clearRoute = () => {
    setPoints([])
    setOpenPopover(false)
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
      <Card className="absolute bg-gray-50/60 p-10 z-10 top-28 left-10 rounded-xl flex justify-center items-center space-y-10">
        <div className="flex space-x-8 opacity-100">
          <div className="font-bold text-lg flex space-x-1">
            <span>{distance}</span>
            <span>km</span>
          </div>
          <div className="font-bold text-lg flex space-x-1">
            <span>0.00</span>
            <span>Kcal</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <div>
            <Button color="red" onClick={removeLastPoint}>Remove Point</Button>
          </div>
          <div className="">
          <Popover open={openPopover} handler={setOpenPopover} placement="right" offset={50}>
            <PopoverHandler>
              <Button color="red">Clear Route</Button>
            </PopoverHandler>
            <PopoverContent>
              <div className="text-black bg-gray-50/60 flex flex-col justify-center items-center space-y-4">
                <span>Are you sure you want to clear the route?</span>
                <div className="w-full flex space-x-4 justify-center">
                  <Button color="blue" className="w-1/2" onClick={clearRoute}>Yes</Button>  
                  <Button color="red" className="w-1/2" onClick={()=>setOpenPopover(false)}>No</Button>  
                </div>
              </div>
            
            </PopoverContent>
          </Popover>
       </div>
        </div>
        <div>
          <Button color="blue" onClick={handleSave}>Save</Button>
        </div>
      </Card>
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