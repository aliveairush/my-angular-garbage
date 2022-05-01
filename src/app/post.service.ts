import { Injectable } from '@angular/core';
import {Post} from "./posts-form/posts-form.component";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  public fetchData(): Promise<Array<Post>> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {name: "Post1",
            // children: [
            // {name: "subPost1"},
            // {name: "subPost2"},
            // {name: "subPost3"},
            // ]
          },
          {name: "Post2"},
          {name: "Post3"},
          {name: "Post4"},
          {name: "Post5"},
          {name: "Post6"},
          {name: "Post7"},
        ])
      }, 1500)
    })
  }
}
