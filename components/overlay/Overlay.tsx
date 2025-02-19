

import { Button ,Card, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { Dispatch, SetStateAction } from "react";

interface OverlayProps {
    distance: string
    calories?: string
    openPopover: boolean
    removeLastPoint: () => void 
    setOpenPopover: Dispatch<SetStateAction<boolean>>
    clearRoute: () => void
    handleSave:  () => void
}

export default function Overlay({calories,distance,removeLastPoint,openPopover, setOpenPopover, clearRoute, handleSave}: OverlayProps){
    return (
      <Card className="absolute bg-gray-50/60 p-10 z-10 top-[60%] md:top-28 md:left-10 rounded-xl flex justify-center items-center space-y-5 sm:space-y-10">
        <div className="flex space-x-8 opacity-100">
          <div className="font-bold text-lg flex space-x-1">
            <span>{distance}</span>
            <span>km</span>
          </div>
          <div className="font-bold text-lg flex space-x-1">
            <span>{calories}</span>
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
          <Popover placement="bottom">
          <PopoverHandler>
          <Button color="blue" onClick={handleSave}>Save</Button>
          </PopoverHandler>
          <PopoverContent className="z-50">
            <div>
              <p className="font-bold">Coming soon!</p>
            </div>
          </PopoverContent>
          </Popover>
        </div>
      </Card>
    )
}