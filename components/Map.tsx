import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng } from "leaflet"


import Route from "./Route";
import { useEffect, useRef, useState} from "react";
import { calcDistance } from "@/helpers/RouteHelpers";
import Overlay from "./overlay/Overlay";



function renderLoginPopup(){
}

function saveToServer(){

}

function calcCalories(distance: string): number{
  return 70*Number(distance)
}

export default function Map() {
  const mapRef = useRef<L.Map>(null)
  const position: LatLngExpression = [59.325264776484666, 18.07139396667481] //TODO: this should be changed to be your location or in the middle of stockholm or something.
  const [points, setPoints] = useState<LatLng[]>([]);
  const [distance, setDistance] = useState<string>("0")
  const [calories, setCalories] = useState<string>("0")
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const [openPopover, setOpenPopover] = useState(false)

  useEffect(() => {
    setDistance(calcDistance(points).toFixed(2))
  },[points])

  useEffect(() => {
    setCalories(calcCalories(distance).toFixed(0))
  }, [distance])

  //const handleOpen = () => setOpenPopover((cur)=> !cur)

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
      setLoggedIn(true);
    }
  }

  return (
    <div className="relative w-[100%] h-[100%]">
      <Overlay 
        distance={distance}
        calories={calories}
        removeLastPoint={removeLastPoint}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        clearRoute={clearRoute}
        handleSave={handleSave}

      ></Overlay>
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