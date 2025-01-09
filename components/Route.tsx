

import { useEffect, useState } from "react"
import LocationMarker from "./LocationMarker"
import { useMapEvent ,Polyline} from "react-leaflet"
import { LatLng } from "leaflet"

function saveToServer(points: LatLng[]){
   const data = JSON.stringify(points)   
   //TODO
}

function calcDistance(points:LatLng[]){
    if (points.length < 2) return 0;

    const sum = points.reduce((acc,currentVal, idx, array) => {
        if (idx < array.length-1){
            return acc + currentVal.distanceTo(array[idx+1])
        }
        return acc
    },0)

    return sum
}


export default function Route(){
    const [state, setState] = useState<LatLng[]>([])

    useMapEvent('click',
        (e) => {
            setState((prevState) =>[...prevState, e.latlng])
            saveToServer(state)
        }
    )

    const updatePosOnDrag = (key:number, newPos:LatLng) => {
        setState((prevState) => 
            prevState.map((pos, index) => (index === key ? newPos : pos))
        );
    }

    useEffect(()=> {console.log(calcDistance(state))},[state])

    const markers = state.map((position,idx) => {
        return <LocationMarker key={idx} idx={idx} position={position} updatePosOnDrag={updatePosOnDrag}></LocationMarker>})

    return(
        <div>
            {markers}
            <Polyline positions={state}></Polyline>
        </div>
    )
}
