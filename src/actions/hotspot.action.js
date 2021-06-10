import { hotspotService } from "../services";
import { hotspotConstant} from "../constants";

export const hotspotAction = {
    saveHotspot
}

function saveHotspot(img, rect) {
    return async dispatch => {
        dispatch(request())

        try {
            const response = await hotspotService.saveHotspot(img, rect)
            dispatch(success({words: response}))
        } catch(error) {
            dispatch(failure({error: error.toString()}))
        }
    }

    function request(){return {type: hotspotConstant.SAVE_HOTSPOT_REQUEST}}
    function success() {return { type: hotspotConstant.SAVE_HOTSPOT_SUCCESS}}
    function failure(error) {return { type: hotspotConstant.SAVE_HOTSPOT_FAILURE, payload: error}}
}