import { OperatorFunction } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { Safe, SafeType } from "../../safe";
import { Part } from "../part";
import { add } from "../utils/create-add";
import { select } from "../utils/select";

export class ProgressPart<S, R> implements Part<S, R> {
    private progress = 0;

    update(safe: Safe<S, R>) {
        switch (safe.type) {
            case SafeType.Initialize:
                break;
            case SafeType.Start:
                this.progress++;
                break;
            default:
                if (safe.isComplete) this.progress--;
                break;
        }
    }

    static Add<S, R, K = never, V = never>(): OperatorFunction<
        Map<typeof Safe | K, Safe<S, R> | V> | Safe<S, R>,
        Map<typeof Safe | typeof ProgressPart | K, Safe<S, R> | ProgressPart<S, R> | V>
    > {
        return add(ProgressPart);
    }

    static Select<S, R, K, V>(): OperatorFunction<Map<typeof ProgressPart | K, ProgressPart<S, R> | V>, boolean> {
        return (src$) =>
            src$.pipe(
                select(ProgressPart),
                map((v) => Boolean(v.progress)),
                distinctUntilChanged()
            );
    }

    static SelectCount<S, R, K, V>(): OperatorFunction<Map<typeof ProgressPart | K, ProgressPart<S, R> | V>, number> {
        return (src$) =>
            src$.pipe(
                select(ProgressPart),
                map((v) => v.progress),
                distinctUntilChanged()
            );
    }
}
