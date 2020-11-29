# Safe operators

Materialize start and end of operator

Contains ready-made operators:

-   Safe operators - ready-made safe operators:
    -   `safeSwitchMap`
    -   `safeConcatMap`
    -   `safeMergeMap`
    -   `safeExhaustMap`
-   Part operators - ready-made data-enriching operators:
    -   `payload`
    -   `error`
    -   `progress`
    -   `inProgress`

## Installation

```sh
npm i @saferx/safe
```

## Usage

```ts
import { CallableSubject } from "@saferx/callable-subject";

const safeObeservable$ = of(0).pipe(
    safeSwitchMap(() => of(1)),
    withInProgress
);
const value$ = safeObeservable$.pipe(toValue);
const error$ = safeMultiObeservable$.get("error");
const inProgress$ = safeObeservable$.pipe(selectInProgress);
```

### With toObservable

```ts
import { CallableSubject } from "@saferx/callable-subject";

const safeMultiObeservable$ = toMultiObservable(
    of(0).pipe(
        safeSwitchMap(() => of(1)),
        withInProgress
    )
); // is the value$
const error$ = safeMultiObeservable$.get("error");
const inProgress$ = safeMultiObeservable$.get("inProgress");
```
