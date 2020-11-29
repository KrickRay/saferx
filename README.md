# SafeRx

![npm](https://img.shields.io/npm/v/saferx)

"Safe" extensions and utilities for the [RxJS](https://github.com/ReactiveX/rxjs):

-   [Callable Subject](https://github.com/KrickRay/saferx/tree/main/packages/callable-subject) - subjects that can be called
-   [Multi Observable](https://github.com/KrickRay/saferx/tree/main/packages/multi-observable) - wrapper for several observables at once
-   [Safe operators](https://github.com/KrickRay/saferx/tree/main/packages/safe) - materialize start and end of operator

## Installation

Installing all libraries:

```sh
npm i saferx
```

Installing the certain library:

```sh
npm i @saferx/<LIBRARY_NAME>
```

## Usage

Full demo available in [packages/saferx/demo](https://github.com/KrickRay/saferx/tree/main/packages/saferx/demo)

```ts
import { CallableSubject, toMultiObservable, safeSwitchMap, withInProgress } from "saferx";
import { shareReplay } from "rxjs/operators";

import { api, API } from "./api";

export class UserService {
    loadUser = new CallableSubject<{ id: number }>();

    user$ = toMultiObservable(
        this.loadUser.pipe(
            safeSwitchMap(({ id }) => this.api.loadUser(id)),
            withInProgress,
            shareReplay(1)
        )
    );

    userError$ = this.user$.get("error");
    userInProgress$ = this.user$.get("inProgress");

    constructor(private api: API) {}
}

const user = new UserService(api);
user.user$.subscribe(console.log);
user.loadUser({ id: 1 });
```

Examples with specific libraries are available in the ["ReadMe" of these packages](https://github.com/KrickRay/saferx/tree/main/packages)

## Contributing

-   Package manager: [Yarn](https://yarnpkg.com/)
-   Monorepo: [Lerna](https://github.com/lerna/lerna)
-   Commits: [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
-   Code formatter: [Prettier](https://prettier.io/)

### Initialize

```sh
yarn bootstrap
```

### Publish

```sh
yarn release
```
