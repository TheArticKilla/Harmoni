const axios = require('axios').default;

let url = "http://localhost:8080";

export class Rider_Type {
  id!: number;
  description!: string;
}

class Rider_TypeService {
  getRider_Types() {
    return axios.get(url + '/rider_type').then((response: {data: Rider_Type[]}) => response.data);
  }

  getRider_Type(id: number) {
    return axios.get(url + '/rider_type' + id).then((response: {data: Rider_Type}) => response.data);
  }
}

export default new Rider_TypeService();
