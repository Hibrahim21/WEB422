import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from './position';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../helper';
@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private readonly http: HttpClient) {}
  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>("https://infinite-island-86183.herokuapp.com/positions");
  }

  savePosition(position: Position): Observable<any>{
    return this.http.put<Position>(  `https://infinite-island-86183.herokuapp.com/${position._id}`, position)
  }

  getPosition(id: string): Observable<Position[]>{
    return this.http.get<Position[]>(`https://infinite-island-86183.herokuapp.com/position/${id}`);
  }
}
