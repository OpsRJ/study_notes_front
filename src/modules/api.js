import * as _ from 'lodash';

const token = _.isNil(localStorage.getItem('token')) ? null : localStorage.getItem('token');

class Api {

    constructor() {
        let requestOptions = {
            method: '',
            headers: { 'Content-Type': 'application/json' },
        };

        if (!_.isNil(token)) {
            requestOptions.headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }

        this.options = requestOptions;
    }

    handleSuccess(response) {
        return response;
    }
    
    handleError = (error) => {
        switch (error) {
            case 401:
            this.redirectTo(document, '/')
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

    get(path) {
        this.options.method = 'GET';

        return fetch(process.env.VUE_APP_EXTERNAL_API + path, this.options).then(
            (response) => response.json()
        );
    }

    post(path, payload) {
        this.options.method = 'POST';
        this.options.body = JSON.stringify(payload);

        let endpoint = _.isNil(token) ? process.env.VUE_APP_EXTERNAL_LOGIN : process.env.VUE_APP_EXTERNAL_API;

        return fetch(endpoint + path, this.options).then(
            (response) => response.json()
        ).catch(error => {
            console.error('There was an error!', error);
        });
    }
}

export default new Api;