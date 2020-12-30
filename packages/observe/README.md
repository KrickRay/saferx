# Observe

[![npm version](https://badge.fury.io/js/%40saferx%2Fobserve.svg)](https://badge.fury.io/js/%40saferx%2Fobserve)

Observe class property to subject

> [Other "safe" extensions and utilities for RxJS](https://github.com/KrickRay/saferx)

## Installation

```sh
npm i @saferx/observe
```

## Usage

```ts
import { Observable } from "rxjs";
import { observe } from "@saferx/observe";

export class User {
    @observe("name$") name: string;
    name$: Observable<string>;
}
```
