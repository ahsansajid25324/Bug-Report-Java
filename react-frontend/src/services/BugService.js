import axios from 'axios';

const BUG_API_BASE_URL = "http://localhost:8080/api/v1/bug";

class BugService {

    getBugs() {
        return axios.get(BUG_API_BASE_URL);
    }

    getBugById(id) {
        return axios.get(`${BUG_API_BASE_URL}/${id}`);
    }

    updateBug(bug, id) {
        return axios.put(`${BUG_API_BASE_URL}/${id}`, bug);
    }

    deleteBug(bugId){
        return axios.delete(BUG_API_BASE_URL+'/'+bugId);
    }
}

export default new BugService();
