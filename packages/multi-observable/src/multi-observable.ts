import { Observable } from "rxjs";
import { getPart } from "./get-part";

export type Multi<T extends { [N in PropertyKey]: any } = { [N in PropertyKey]: any }> = T;

export class MultiObservable<
    V extends PropertyKey = "value",
    M extends Multi<{ [N in V]: any }> = Multi<{ [N in V]: any }>
> extends Observable<V> {
    constructor(private multi$: Observable<M>, public mainPart: V = "value" as V) {
        super();
        this.source = this.get(mainPart);
    }

    get<P extends keyof M>(part: P): Observable<M[P]> {
        return this.multi$.pipe(getPart(part) as any);
    }
}
