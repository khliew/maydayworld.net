import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Discography } from '../../model';
import { AdminService } from '../admin.service';
import { SectionsParser } from './sections-parser';

@Component({
  selector: 'app-discography-creator',
  templateUrl: './discography-creator.component.html',
  styleUrls: ['./discography-creator.component.css']
})
export class DiscographyCreatorComponent implements OnInit {
  discoForm = this.fb.group({
    artistId: [''],
    sections: ['']
  });
  outputForm = this.fb.control('');
  accessForm = this.fb.control('');

  sectionsParser: SectionsParser;
  hideOutput: boolean;
  output: Discography;
  response: string;
  buttonsDisabled: boolean;

  searchDisabled: boolean;
  searchError: string;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.sectionsParser = new SectionsParser();
    this.hideOutput = true;
    this.response = '';
    this.buttonsDisabled = false;

    this.searchDisabled = false;
    this.searchError = '';
  }

  ngOnInit() { }

  searchDiscography() {
    const artistId = this.discoForm.get('artistId').value;

    if (!!artistId) {
      this.searchError = '';
      this.searchDisabled = true;

      this.adminService.getDiscography(artistId)
        .subscribe(discography => {
          this.searchDisabled = false;
          this.fillForm(discography);
        }, err => {
          this.searchDisabled = false;
          this.searchError = err;
        });
    }
  }

  fillForm(discography: Discography) {
    this.discoForm.get('artistId').setValue(discography.id);

    const sections = discography.sections
      .map(section => {
        const albumIds = section.albums.map(album => album.id).join('\n');
        return `S\n${section.type}\n${albumIds}\n`;
      })
      .join('\n');
    this.discoForm.get('sections').setValue(sections);
  }

  clear() {
    this.discoForm.reset();
    this.response = '';
    this.searchError = '';
  }

  generateJson() {
    this.output = new Discography();
    this.output.id = this.discoForm.get('artistId').value;

    this.output.sections = this.parseSections(this.discoForm.get('sections').value);

    this.hideOutput = false;
    this.response = '';
    this.searchError = '';
    this.outputForm.setValue(JSON.stringify(this.output, null, 2));
  }

  parseSections(sections: string): any {
    return this.sectionsParser.parse(sections);
  }

  createDiscography() {
    this.adminService.setAccess(this.accessForm.value);

    this.response = '';
    this.buttonsDisabled = true;
    this.adminService.createDiscography(this.output)
      .subscribe(res => {
        this.response = 'Discography created!';
        this.buttonsDisabled = false;
      }, err => {
        this.response = err;
        this.buttonsDisabled = false;
      });
  }

  replaceDiscography() {
    this.adminService.setAccess(this.accessForm.value);

    this.response = '';
    this.buttonsDisabled = true;
    this.adminService.replaceDiscography(this.output)
      .subscribe(res => {
        this.response = 'Discography replaced!';
        this.buttonsDisabled = false;
      }, err => {
        this.response = err;
        this.buttonsDisabled = false;
      });
  }
}
