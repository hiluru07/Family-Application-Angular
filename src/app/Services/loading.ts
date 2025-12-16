import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Loading {
  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();

  show()
  {
    console.log("LOADER SHOW CALLED");
    this._loading.next(true)
  }
  hide()
  {
    this._loading.next(false)
  }
}
