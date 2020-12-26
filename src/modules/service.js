import axios from 'axios';

import * as _ from 'lodash';

const token = _.isNil(localStorage.getItem('token')) ? null : localStorage.getItem('token');

class Service {
  constructor() {
    let service = undefined;
    
    if (!_.isNil(token)) {
      service = axios.create({
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
    } else {
      service = axios.create({});
    }
    
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = (error) => {
    switch (error.response.status) {
      case 401:
        //this.redirectTo(document, '/')
        break;
      case 404:
        this.redirectTo(document, '/404')
        break;
      default:
        this.redirectTo(document, '/500')
        break;
    }

    return Promise.reject(error)
  }

  redirectTo = (document, path) => {
    document.location = path
  }
  
  get(path, callback) {
    
    return this.service.get(process.env.VUE_APP_EXTERNAL_API + path).then(
      (response) => {callback(response.status, response.data); return;}
    );
  }

  patch(path, payload, callback) {
    return this.service.request({
      method: 'PATCH',
      url: process.env.VUE_APP_EXTERNAL_API + path,
      responseType: 'json',
      data: payload
    }).then((response) => callback(response.status, response.data));
  }

  post(path, payload, callback) {
    let endpoint = _.isNil(token) ? process.env.VUE_APP_EXTERNAL_LOGIN : process.env.VUE_APP_EXTERNAL_API;

    return this.service.request({
      method: 'POST',
      url: endpoint + path,
      responseType: 'json',
      data: payload
    }).then((response) => callback(response.status, response.data));
  }
}

export default new Service;