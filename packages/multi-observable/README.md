# Multi Observable

Wrapper for several observables at once

## Installation

```sh
npm i @saferx/multi-observable
```

## Usage

```ts
import { MultiObservable } from "@saferx/multi-observable";

const multiObservableName$ = new MultiObservable(of({ name: "Test", age: 20 }), "name"); // return only 'name': 'Test'
const age$ = name$.get("age"); // return only 'age': 20
```
