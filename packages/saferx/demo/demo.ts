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
