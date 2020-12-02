# Safe operators

[![npm version](https://badge.fury.io/js/%40saferx%2Fcallable-subject.svg)](https://badge.fury.io/js/%40saferx%2Fsafe)

Materialize start and end of operator

Contains ready-made operators:

-   Safe operators - ready-made safe operators:
    -   `safeSwitchMap`
    -   `safeConcatMap`
    -   `safeMergeMap`
    -   `safeExhaustMap`
-   Part operators - ready-made data-enriching operators:
    -   `value`
    -   `error`
    -   `progress`
    -   `inProgress`
-   Utils
    -   `toMultiObservable` operator - convert to MultiObservable
    -   `select` operator - part selection

> [Other "safe" extensions and utilities for RxJS](https://github.com/KrickRay/saferx)

## Installation

```sh
npm i @saferx/safe
```

## Usage

```ts
import { safeSwitchMap, selectValue, selectError, selectInProgress, withInProgress } from "@saferx/safe";
import { of } from "rxjs";

const helloWorld$ = of("Hello").pipe(
    safeSwitchMap((name) => of(`${name}, world!`)),
    withInProgress
);

const value$ = helloWorld$.pipe(selectValue); // return: Hello, world!
const error$ = helloWorld$.pipe(selectError); // return nothing
const inProgress$ = helloWorld$.pipe(selectInProgress); // return: false, true, false
```

### With toObservable

```ts
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
```
