import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CardsDataSource } from '../datasources/cards.datasource';
import { Card } from "../models/card.model";

@Injectable()
export class CardRepository {
    constructor(private _datasource: CardsDataSource) {}

    getAllCards(): Observable<any> {
        return this._datasource.getAllCards();
    }
}