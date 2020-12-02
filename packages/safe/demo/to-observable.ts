import { safeSwitchMap, withProgress, toMultiObservable, withInProgress } from "@saferx/safe";
import { of } from "rxjs";

class Hello {
    helloWorld$ = toMultiObservable(
        of("world").pipe(
            safeSwitchMap((name) => of(`Hello, ${name}!`)),
            withProgress,
            withInProgress
        )
    ); // the value$
    error$ = this.helloWorld$.get("value");
    progress$ = this.helloWorld$.get("progress"); // `select` - universal part selection
}
