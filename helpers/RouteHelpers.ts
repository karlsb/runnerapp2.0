import { LatLng } from "leaflet"

export function calcDistance(points:LatLng[]) : number {
    if (points.length < 2) return 0;

    const sum = points.reduce((acc,currentVal, idx, array) => {
        if (idx < array.length-1){
            return acc + currentVal.distanceTo(array[idx+1])
        }
        return acc
    },0)

    return sum
}
