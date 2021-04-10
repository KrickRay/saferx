import { safeSwitchMap, ProgressPart, UpdatedAtPart, Safe } from "@saferx/safe";
import { of } from "rxjs";
import { delay, shareReplay } from "rxjs/operators";

const helloWorld$ = of("world").pipe(
    safeSwitchMap((name) => of(`Hello, ${name}!`).pipe(delay(1000))),
    ProgressPart.Add(),
    UpdatedAtPart.Add(),
    shareReplay(1)
);

helloWorld$.pipe(ProgressPart.Select()).subscribe((value) => console.log("progress:", value));
helloWorld$.pipe(UpdatedAtPart.Select()).subscribe((value) => console.log("updatedAt:", value));
helloWorld$.pipe(Safe.SelectValue()).subscribe((value) => console.log("value:", value));
helloWorld$.pipe(Safe.SelectError()).subscribe((value) => console.log("error:", value));

// progress: true
// value: Hello, world!
// error: undefined
// progress: false
// updatedAt: 2021-04-10T22:32:59.944Z
