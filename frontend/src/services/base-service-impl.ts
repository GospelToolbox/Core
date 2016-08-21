import { Promise } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ServiceResponse } from '../models/service-response';

export class BaseServiceImpl<T> {

    constructor(
        protected http: Http,
        protected baseUrl: string
    ) { }

    /**
     * Generic method for making GET requests
     */
    protected get(path: string = null): Promise<ServiceResponse<T>> {
        let url = (path != null) ? `${this.baseUrl}/${path}` : this.baseUrl;

        let headers = new Headers();

        return this.http.get(url, {headers: headers, withCredentials: true})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    protected put(data, path: string = null): Promise<ServiceResponse<T>> {
        let url = (path != null) ? `${this.baseUrl}/${path}` : this.baseUrl;

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.put(url, JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    protected post(data: any, path: string = null): Promise<ServiceResponse<T>> {
        let url = (path != null) ? `${this.baseUrl}/${path}` : this.baseUrl;

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(url, JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    protected delete(path: string = null): Promise {
        let url = (path != null) ? `${this.baseUrl}/${path}` : this.baseUrl;

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.delete(url, { headers: headers })
            .toPromise()
            .catch(this.handleError);
    }

    protected handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}