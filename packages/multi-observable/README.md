# Multi Observable

![npm](https://img.shields.io/npm/v/@saferx/multi-observable)

Wrapper for several observables at once

> [Other "safe" extensions and utilities for RxJS](https://github.com/KrickRay/saferx)

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
