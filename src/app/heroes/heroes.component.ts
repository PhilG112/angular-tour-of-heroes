import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'
import { HeroService } from '../services/hero-services/hero.service';
import { MessageService } from '../services/message-services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }

  add(name: string): void {
    name = name.trim();
    if (!name) return;
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(id: number): void {
    this.heroes = this.heroes.filter(h => h.id != id);
    this.heroService.deleteHero(id).subscribe();
  }
}