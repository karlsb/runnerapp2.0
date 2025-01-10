import { useEffect, useState } from "react"
import LocationMarker from "./LocationMarker"
import { useMapEvent, useMapEvents,Polyline} from "react-leaflet"
import { LatLng, popup } from "leaflet"
import { calcDistance } from "@/helpers/RouteHelpers"

function saveToServer(points: LatLng[]){
   const data = JSON.stringify(points)   
   //TODO
}

export default function Route(){
    const [state, setState] = useState<LatLng[]>([])

    const [popupOpen, setPopupOpen] = useState<boolean>(false)

    useMapEvent('click',
        (e) => {
            if(popupOpen){
                setPopupOpen(false)
                return
            }
            setState((prevState) =>[...prevState, e.latlng])
            saveToServer(state)
        }
    )

    const updatePosOnDrag = (key:number, newPos:LatLng) => {
        setState((prevState) => 
            prevState.map((pos, index) => (index === key ? newPos : pos))
        );
    }

    const onRemove = (key:number) => {
        setState((prevState) => 
            prevState.filter((_, index) => index !== key)
        );
    }

    useEffect(()=> {console.log(calcDistance(state))},[state])

    const markers = state.map((position,idx) => {
        return <LocationMarker key={idx} idx={idx} position={position} updatePosOnDrag={updatePosOnDrag} onRemove={onRemove} setPopupOpen={setPopupOpen}></LocationMarker>})

    return(
        <div>
            {markers}
            <Polyline positions={state} color="#6A80B9"></Polyline>
        </div>
    )
}
