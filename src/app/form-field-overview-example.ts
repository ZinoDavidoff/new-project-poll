import {Component, OnInit} from '@angular/core';


/** @title Simple form field */
@Component({
  selector: 'form-field-overview-example',
  templateUrl: 'form-field-overview-example.html',
})
export class FormFieldOverviewExample implements OnInit {
  question: string = 'Do you like this poll?';
  yesAnswer: string = 'Yes';
  noAnswer: string = 'No';

  yesVotes: number = 10;
  noVotes: number = 58;
  hasVoted: boolean = false;

  constructor() { }

  ngOnInit(): void {
    let hasVoted = localStorage.getItem('hasVoted');
    if (hasVoted === 'true') {
      this.hasVoted = true;
      this.loadVotes();
    }
  }

  vote(answer: string): void {
    if (!this.hasVoted) {
      if (answer === 'yes') {
        this.yesVotes++;
      } else {
        this.noVotes++;
      }
      localStorage.setItem('hasVoted', 'true');
      this.hasVoted = true;
      this.saveVotes();
    }
  }

  private saveVotes(): void {
    localStorage.setItem('yesVotes', this.yesVotes.toString());
    localStorage.setItem('noVotes', this.noVotes.toString());
  }

  private loadVotes(): void {
    let yesVotes = localStorage.getItem('yesVotes');
    if (yesVotes) {
      this.yesVotes = parseInt(yesVotes);
    }
    let noVotes = localStorage.getItem('noVotes');
    if (noVotes) {
      this.noVotes = parseInt(noVotes);
    }
  }

  get totalVotes(): number {
    return this.yesVotes + this.noVotes;
  }

  get yesPercentage(): number {
    return (this.yesVotes / this.totalVotes) * 100;
  }

  get noPercentage(): number {
    return (this.noVotes / this.totalVotes) * 100;
  }

  reset(): void {
    localStorage.removeItem('hasVoted');
    localStorage.removeItem('yesVotes');
    localStorage.removeItem('noVotes');
    this.yesVotes = 0;
    this.noVotes = 0;
    this.hasVoted = false;
  }
}


