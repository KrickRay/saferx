import { CallableSubject, safeSwitchMap, withInProgress, selectError, selectInProgress, selectValue } from "saferx";
import { shareReplay } from "rxjs/operators";

import { api, API } from "./api";

export class UserService {
    loadUser = new CallableSubject<{ id: number }>();

    private user = this.loadUser.pipe(
        safeSwitchMap(({ id }) => this.api.loadUser(id)),
        withInProgress,
        shareReplay(1)
    );

    user$ = this.user.pipe(selectValue);
    userError$ = this.user.pipe(selectError);
    userInProgress$ = this.user.pipe(selectInProgress);

    constructor(private api: API) {}
}

const user = new UserService(api);
user.user$.subscribe(console.log);
user.loadUser({ id: 1 });
