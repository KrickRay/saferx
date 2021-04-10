import { OperatorFunction } from "rxjs";
import { map, filter, distinctUntilChanged } from "rxjs/operators";
import { Safe } from "../../safe";
import { Part } from "../part";
import { add } from "../utils/create-add";
import { select } from "../utils/select";

export class UpdatedAtPart<S, R> implements Part<S, R> {
    private date: Date;

    update<S, R>(safe: Safe<S, R>) {
        if (safe.isComplete) {
            this.date = new Date();
        }
    }

    static Add<S, R, K = never, V = never>(): OperatorFunction<
        Map<typeof Safe | K, Safe<S, R> | V> | Safe<S, R>,
        Map<typeof Safe | typeof UpdatedAtPart | K, Safe<S, R> | UpdatedAtPart<S, R> | V>
    > {
        return add(UpdatedAtPart);
    }

    static Select<S, R, K, V>(): OperatorFunction<Map<typeof UpdatedAtPart | K, UpdatedAtPart<S, R> | V>, Date> {
        return (src$) =>
            src$.pipe(
                select(UpdatedAtPart),
                map((v: UpdatedAtPart<S, R>) => v.date),
                filter((v) => Boolean(v)),
                distinctUntilChanged()
            );
    }
}
