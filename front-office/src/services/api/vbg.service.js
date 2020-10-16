import api from "./api"

class VbgDataService{
    getAll(){
        return api.get('vbg');
    }
}

export default new VbgDataService();