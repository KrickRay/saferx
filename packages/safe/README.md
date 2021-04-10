# Safe operators

[![npm version](https://badge.fury.io/js/%40saferx%2Fsafe.svg)](https://badge.fury.io/js/%40saferx%2Fsafe)

Materialize start and end of operator

Contains ready-made operators:

-   Safe operators - ready-made safe operators:
    -   `safeSwitchMap`
    -   `safeConcatMap`
    -   `safeMergeMap`
    -   ~~`safeExhaustMap`~~ (TODO)
    -   `safeMergeScan`
-   Part operators - ready-made data-enriching operators:
    -   `ProgressPart`
    -   `UpdatedAtPart`

> [Other "safe" extensions and utilities for RxJS](https://github.com/KrickRay/saferx)

## Installation

```sh
npm i @saferx/safe
```

## Usage

```ts
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

// progress: false
// progress: true
// value: Hello, world!
// progress: false
// updatedAt: 2021-04-10T22:34:31.790Z
// error: undefined
```
