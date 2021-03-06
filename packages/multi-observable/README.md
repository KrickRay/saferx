# Multi Observable

[![npm version](https://badge.fury.io/js/%40saferx%2Fmulti-observable.svg)](https://badge.fury.io/js/%40saferx%2Fmulti-observable)

Wrapper for several observables at once

> [Other "safe" extensions and utilities for RxJS](https://github.com/KrickRay/saferx)

## Installation

```sh
npm i @saferx/multi-observable
```

## Usage

```ts
import { MultiObservable } from "@saferx/multi-observable";
import { of } from "rxjs";

const multiObservableName$ = new MultiObservable(of({ name: "Test", age: 20 }), "name"); // return only 'name': 'Test'
const age$ = multiObservableName$.get("age"); // return only 'age': 20
```
