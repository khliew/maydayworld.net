import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterLinkStubDirective, RouterOutletStubComponent } from '../testing';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let links: RouterLinkStubDirective[];
let linkDes: DebugElement[];

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));
    links = linkDes.map(
      de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
    );
  });

  it ('should work', () => {
    expect(comp instanceof AppComponent).toBe(true, 'should create AppComponent');
  });

  it('can get RouterLinks from template', () => {
   expect(links.length).toBe(1, 'should have 1 link');
   expect(links[0].linkParams).toBe('/songs', '1st link should go to Songs');
 });

 it('can click Songs link in template', () => {
   const songsLinkDe = linkDes[0];
   const songsLink = links[0];

   expect(songsLink.navigatedTo).toBeNull('link should not have navigated yet');

   songsLinkDe.triggerEventHandler('click', null);
   fixture.detectChanges();

   expect(songsLink.navigatedTo).toBe('/songs');
 });
});
