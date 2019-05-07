import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {
    private subject = new Subject<any>();
   constructor(private router: Router) {
        //
        // Hide the loader on route changed.
        //
        router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
             // Clear alert
             this.subject.next();
           }
        });
    }

    showLoader() {
        this.subject.next({display: true});
    }

    hideLoader() {
        this.subject.next();
    }

    getDisplayStatus() {
       return this.subject.asObservable();
    }
}
