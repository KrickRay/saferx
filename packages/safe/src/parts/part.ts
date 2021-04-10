import { Observable } from "rxjs";
import { Safe } from "../safe";

export interface Part<S, R> {
    update(safe: Safe<S, R>): Observable<void> | void;
}
