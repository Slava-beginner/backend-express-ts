import {v4} from 'uuid'
export const getRandomId = () : string =>{
    return v4().replace(/-/g,'').slice(0,33)

}