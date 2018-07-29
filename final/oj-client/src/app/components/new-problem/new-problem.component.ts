import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from "../../models/problem.model";
import { AuthService } from '../../services/auth.service';

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
  requireField: boolean;

  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);
  constructor(@Inject('data') private data,
            private auth: AuthService) { }

  ngOnInit() {
  }

  addProblem(): void {
    if (this.newProblem.name == "") {
      this.requireField = true;
      console.log("please enter the problem name");
      return;
    } else {
      var array = this.newProblem.name.split(' ');
      var result =  [];
      for (var i = 0; i < array.length; i++) {
        result[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
      }
      this.newProblem.name = result.join(" ");
      this.requireField = false;
    }
    this.data.addProblem(this.newProblem)
      .catch(error => console.log(error.body));
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }

}
