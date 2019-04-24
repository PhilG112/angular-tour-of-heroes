import { Injectable } from '@angular/core';
import { Hero } from '../../hero';
import { HEROES } from '../../mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message-services/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // TODO: Send the message _after_ fetching the heroes
    this.messageService.add('HeroService: Fetched Heroes');
    return of(HEROES);
  }
}
