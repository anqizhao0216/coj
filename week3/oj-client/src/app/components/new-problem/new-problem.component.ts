import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from "../../models/problem.model";

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id: 0,
  name: "",
  desc: "",
  difficulty: "Easy"
});

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent implements OnInit {

  public difficulties = ["Easy", "Medium", "Hard", "Super"];

  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);
  constructor(@Inject('data') private data) { }

  ngOnInit() {
  }

  addProblem(): void {
    if (this.newProblem.name == "") {
      console.log("please enter the problem name");
      return;
    }
    this.data.addProblem(this.newProblem)
      .catch(error => console.log(error.body));
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }

}
