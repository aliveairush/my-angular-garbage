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
          {id: 1, name: "Post1",
            children: [
            {id: 11,name: "subPost11"},
            {id: 12,name: "subPost12"},
            {id: 13,name: "subPost13"},
            ]
          },
          {id: 2, name: "Post2",children: [
              {id: 21,name: "subPost21"},
              {id: 22,name: "subPost22"},
              {id: 23,name: "subPost23"},
            ]},
          {id: 3,name: "Post3"},
          {id: 4,name: "Post4"},
          {id: 5,name: "Post5"},
          {id: 6,name: "Post6"},
          {id: 7,name: "Post7"},
        ])
      }, 1500)
    })
  }
}
