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
        )
    }

    const onRemove = (key:number) => {
        setState((prevState) => 
            prevState.filter((_, index) => index !== key)
        )
    }

    const insertMarkerBetween = (e:any, idx:number) => {
        if (e.originalEvent.view) {
            e.originalEvent.view.L.DomEvent.stopPropagation(e)
        }
        setState((prevState) => {
                const leftState = prevState.slice(0, idx+1)
                const rightState = prevState.slice(idx+1)
                return [...leftState, e.latlng, ...rightState]
            }
        )
    }

    const lines = state.map((position,idx) => {
        if( idx === state.length -1) return null;
        return (<Polyline key={idx}
                    eventHandlers={{
                        click: (e) => {
                            insertMarkerBetween(e,idx) // need to know which markers the polyline is inbetween.
                        }
                    }}
                    positions={[position, state[idx +1]]}
                    color="#6A80B9"
                    ></Polyline>)
    })

    const markers = state.map((position,idx) => {
        return <LocationMarker key={idx} idx={idx} position={position} updatePosOnDrag={updatePosOnDrag} onRemove={onRemove} setPopupOpen={setPopupOpen}></LocationMarker>})

    return(
        <div>
            {markers}
            {lines}
            {/*<Polyline 
                eventHandlers={{
                    click: (e) => insertMarkerBetween(e) // need to know which markers the polyline is inbetween.
                }}
                positions={state} color="#6A80B9"></Polyline>*/}
        </div>
    )
}
