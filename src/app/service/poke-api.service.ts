import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';

  constructor(
    private http: HttpClient
  ) {}

  public getAll(): Observable<any> {
    return this.http
      .get<any>(this.url)
      .pipe(
        tap(res => res),
        tap(res => {
          return res.results
            .map((resPokemons: any) => {
              return this.getDetails(resPokemons.url)
                .subscribe(res => resPokemons.status = res)
          });
        })
      );
  }

  public getDetails(url: string): Observable<any> {
    return this.http
      .get<any>(url)
      .pipe(
        map(res => res)
      )
  }
}
