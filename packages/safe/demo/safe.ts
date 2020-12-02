import { safeSwitchMap, selectValue, selectError, selectInProgress, withInProgress } from "@saferx/safe";
import { of } from "rxjs";

const helloWorld$ = of("world").pipe(
    safeSwitchMap((name) => of(`Hello, ${name}!`)),
    withInProgress
);

const value$ = helloWorld$.pipe(selectValue); // return: Hello, world!
const error$ = helloWorld$.pipe(selectError); // return nothing
const inProgress$ = helloWorld$.pipe(selectInProgress); // return: false, true, false
