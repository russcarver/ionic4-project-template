import { Observable, Subject } from 'rxjs';

/*
 * To listen for updates to a Journey (Nba, or anything else):
 * 1) journey.subscription = journey.subject.asObservable().subscribe((newJourney: Journey) => { <your code here> })
 * 2) When your containing class is destroyed (ngOnDestroy) call journey.subscription.unsubscribe()
 */

export interface Listener {
  id: string;
  subject: Subject<any>;
  subscription: Observable<any>;
}

export function createSubject<T>(arg: T): Subject<T> {
  return new Subject<T>();
}
