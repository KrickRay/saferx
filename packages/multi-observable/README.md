# Multi Observable

[![npm version](https://badge.fury.io/js/%40saferx%2Fcallable-subject.svg)](https://badge.fury.io/js/%40saferx%2Fmulti-observable)

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
