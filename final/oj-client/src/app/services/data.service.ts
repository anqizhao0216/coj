import { Injectable } from '@angular/core';
import { Problem } from "../models/problem.model";
import { PROBLEMS } from "../mock-problems";
import { Response } from '@angular/http';
// import { Http, Response, Headers} from '@angular/http';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: HttpClient) { }

  getProblems(): Observable<Problem[]> {
    this.http.get("api/v1/problems")
      .toPromise()
      .then((res: any) => {
        this.problemsSource.next(res);
      })
      .catch(this.handleError);

      return this.problemsSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    return this.http.get(`api/v1/problems/${id}`)
                    .toPromise()
                    .then((res: any) => res)
                    .catch(this.handleError);
  }

  addProblem(problem: Problem): Promise<Problem> {
    const options = {headers: new HttpHeaders({'content-type': 'application/json'})};
    return this.http.post('/api/v1/problems', problem, options)
      .toPromise()
      .then((res: any) => {
        this.getProblems();
        return res;
      })
      .catch(this.handleError);
  }

  buildAndRun(submitCode: any): Promise<Object> {
    const headers = {headers: new HttpHeaders({'content-type': 'application/json'})};
    return this.http.post('api/v1/build_and_run', submitCode, headers)
                    .toPromise()
                    .then((res:Response) => {
                      console.log("hello res");
                      console.log(res);
                      return res;
                    })
                    .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error(`An error occurred`, error);
    return Promise.reject(error.body || error);
  }
}
