import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Occupation } from '../models/occupation.model';

@Injectable({
  providedIn: 'root'
})
export class OccupationService {

  private apiUrl = 'http://localhost:5134/api/occupations';

  constructor(private http: HttpClient) {}

  getOccupations(): Observable<Occupation[]> {
    return this.http.get<Occupation[]>(this.apiUrl);
  }
}