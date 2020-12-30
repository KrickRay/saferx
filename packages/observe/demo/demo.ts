import { Observable } from "rxjs";
import { observe } from "@saferx/observe";

export class User {
    @observe("name$") name: string;
    name$: Observable<string>;
}
