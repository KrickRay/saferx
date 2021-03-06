# Callable Subject

[![npm version](https://badge.fury.io/js/%40saferx%2Fcallable-subject.svg)](https://badge.fury.io/js/%40saferx%2Fcallable-subject)

[Subjects](https://rxjs-dev.firebaseapp.com/guide/subject) that can be called:

-   CallableSubject
-   CallableReplaySubject
-   CallableAsyncSubject
-   CallableBehaviorSubject

Rather, like a Subject. Is not a true extension of the Subject.

Accessible methods: `pipe`, `subscribe`, `complete`, `next` and `source$` (source Subject)

> [Other "safe" extensions and utilities for RxJS](https://github.com/KrickRay/saferx)

## Installation

```sh
npm i @saferx/callable-subject
```

## Usage

```ts
import { CallableSubject } from "@saferx/callable-subject";

const callableSubject = new CallableSubject<number>();

callableSubject(7); // the same as callableSubject.next(7)
callableSubject.pipe(map((v) => v + 1)).subscribe((v) => console.log(v)); // logs: 8
```

## Best practices

-   Better to pass an object to know the names of the parameters:

    ```ts
    const loadUser = new CallableSubject<{ id: number }>();
    // clearer than
    const loadUser = new CallableSubject<number>(); // here it is not clear what is the argument "number"
    ```
