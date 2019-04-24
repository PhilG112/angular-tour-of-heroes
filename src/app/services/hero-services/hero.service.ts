import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../../hero';
import { Observable, of, ObservableInput } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message-services/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesBaseUrl = 'api/heroes';

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesBaseUrl)
      .pipe(
        tap(_ => this.log('Fetched all Heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // Return empty arrayif there is no search term
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesBaseUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  getHeroById(id: number): Observable<Hero> {
    const url = `${this.heroesBaseUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`Fetched hero id=${id}'`)),
        catchError(this.handleError<Hero>('getHero id=${id}'))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(this.heroesBaseUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>(`Failed to update hero id=${hero.id}`))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Hero>(this.heroesBaseUrl, hero, httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`Added new hero name: ${newHero.name}, heroId: ${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const url = `${this.heroesBaseUrl}/${id}`;

    return this.http.delete(url, httpOptions)
      .pipe(
        tap(_ => this.log(`Delete heroId: ${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
  
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
