import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Card } from "../models/card.model";

@Injectable()
export class CardsDataSource {
    constructor( private _http: HttpClient) {}

    getAllCards(): Observable<any> {
        return this._http.get<any>(`${environment.apiUrl}/cards/`).pipe(map(response=>{return response;}));
    }
}