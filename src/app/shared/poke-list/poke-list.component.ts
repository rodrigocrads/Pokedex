import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
  public foundPokemons: any;
  private allPokemons: any;

  public apiError: boolean = false;

  constructor(
    private pokeApiService: PokeApiService
  ) {}

  ngOnInit(): void {
    this.pokeApiService.getAll().subscribe(
      res => {
        this.allPokemons = res.results
        this.foundPokemons = this.allPokemons
      },
      error => {
        this.apiError = true;
      }
    );
  }

  public getSearch(value: string) {
    const filter = this.allPokemons.filter((response: any) => {
      return !response.name.indexOf(value.toLowerCase());
    });

    this.foundPokemons = filter;
  }
}
