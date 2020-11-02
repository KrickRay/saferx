# SafeRx

"Safe" extensions and utilities for the [RxJS](https://github.com/ReactiveX/rxjs):

-   [Callable Subject](https://github.com/KrickRay/saferx/tree/main/packages/callable-subject) - subjects that can be called

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
import { CallableSubject } from "saferx";
import { shareReplay, switchMap } from "rxjs/operators";

import { api } from "./api";

export class UserService {
    loadUser = new CallableSubject<{ id: number }>(); // @saferx/callable-subject

    user$ = this.loadUser.pipe(
        switchMap(({ id }) => api.loadUser(id)),
        shareReplay(1)
    );
}

const user = new UserService();
user.user$.subscribe(console.log);
user.loadUser({ id: 1 });
```

Examples with specific libraries are available in the ["ReadMe" of these packages](https://github.com/KrickRay/saferx/tree/main/packages)

## Contributing

-   [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
