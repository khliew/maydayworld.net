import { Component, OnInit } from '@angular/core';
import { Line } from './line';
import { LineType } from './line.component';

@Component({
  selector: 'app-song-creator',
  templateUrl: './song-creator.component.html',
  styleUrls: ['./song-creator.component.css']
})
export class SongCreatorComponent implements OnInit {
  lines: Line[];
  menuLineIndex: number;

  constructor() {
    this.lines = [];
  }

  ngOnInit() {
  }

  addLine() {
    this.lines.push(new Line());
  }

  insertLine(index: number) {
    this.lines.splice(index, 0, new Line());
  }

  removeLine(index: number) {
    this.lines.splice(index, 1);
  }

  changeLineType(type: LineType) {
    this.lines[this.menuLineIndex].type = type;
  }

  setMenuLineIndex(index: number) {
    this.menuLineIndex = index;
  }
}
