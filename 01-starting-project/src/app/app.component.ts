import { Component, DestroyRef, effect, OnInit, signal } from '@angular/core';
import { inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  // ----- singal to observable -------
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount)

  // ----- observable to signal -------
  interval$ = interval(1000) //esto es de rxjs, funciona con subscription
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });

  // ----- creating a new observable
  customInterval$ = new Observable((subscriber) => {

    let timesExecuted = 0;

    const interval = setInterval(() => {

      subscriber.error();

      if (timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }

      console.log('Emitting new value...')
      subscriber.next({ message: 'New value' });

      timesExecuted++;

    }, 2000);
  }) 

  private destroyRef = inject(DestroyRef);

  constructor() {
//    effect(() => {
//      console.log(`Clicked button ${this.clickCount()} times.`)
//    });
    this.clickCount.update((prevCount) => prevCount + 1)
  }

  ngOnInit(): void {
//   const subscription = interval(1000).pipe(
//    map((val) => val * 2)
//   ).subscribe({
//      next: (val) => console.log(val)
//    });

//    this.destroyRef.onDestroy(() => {
//      subscription.unsubscribe();
//    });

    this.customInterval$.subscribe({
      error: (err) => console.log(err),
      next: (val) => console.log(val),
      complete: () => console.log('Completed')
    })

    const subscription = this.clickCount$.subscribe({
      next: () => console.log(`Clicked button ${this.clickCount()} times.`)
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1)
  }

}
