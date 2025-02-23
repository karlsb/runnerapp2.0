import { Dispatch, SetStateAction } from "react"
import LocationMarker from "./LocationMarker"
import { useMapEvent, Polyline} from "react-leaflet"
import { LatLng } from "leaflet"
import L from "leaflet"
import { calcDistance } from "@/helpers/RouteHelpers"

interface RouteProps{
    mapRef: React.RefObject<L.Map>
    state: LatLng[]
    setState: Dispatch<SetStateAction<LatLng[]>>
}

export default function Route({mapRef, state, setState}:RouteProps){

    useMapEvent('click',
        (e) => {
            setState((prevState) =>[...prevState, e.latlng])
            console.log(calcDistance(state))
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

    const insertMarkerBetween = (e:L.LeafletMouseEvent, idx:number) => {
        if (e.originalEvent.view) {
            //Stop click on polyline from doing map click event. i.e. adding new marker
            //e.originalEvent.view.L.DomEvent.stopPropagation(e)
            L.DomEvent.stopPropagation(e.originalEvent)
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
        return <LocationMarker key={idx} idx={idx} position={position} updatePosOnDrag={updatePosOnDrag} onRemove={onRemove} mapRef={mapRef}></LocationMarker>})

    return(
        <div>
            {markers}
            {lines}
        </div>
    )
}
