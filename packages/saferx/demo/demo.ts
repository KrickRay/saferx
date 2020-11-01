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
