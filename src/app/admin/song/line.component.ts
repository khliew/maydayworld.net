import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-song-creator-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {
  @Input()
  type: LineType = 'lyric';

  @Input()
  zht: string;

  @Input()
  zhp: string;

  @Input()
  eng: string;

  @Input()
  text: string;

  constructor() { }

  ngOnInit() {
  }
}

export type LineType = 'lyric' | 'text' | 'break';
