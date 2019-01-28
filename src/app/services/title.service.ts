import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TitleService {
  constructor(private title: Title) { }

  public setTitle(newTitle: string): void {
    this.title.setTitle(`${newTitle} - Mayday World  五月天世界`);
  }

  public resetTitle(): void {
    this.title.setTitle('Mayday World  五月天世界');
  }
}
