import { OperatorFunction } from "rxjs/internal/types";
import { filter, map } from "rxjs/operators";
import { select } from "../parts/utils/select";
import { SafeType } from "./types/safe-type";

export class Safe<S = any, R = any, E = any> {
    id: symbol;
    type: SafeType;
    startValue?: S;
    value?: R;
    error?: E;

    get isComplete() {
        return this.type === SafeType.Success || this.type === SafeType.Error;
    }

    constructor({ id = Symbol(), type, startValue, value, error }: Partial<Safe<S, R>> = {}) {
        this.id = id;
        this.type = type;
        this.startValue = startValue;
        this.value = value;
        this.error = error;
    }

    create(instance: Partial<Safe<S, R>>) {
        return new Safe({ ...this, ...instance });
    }

    static SelectValue<S, R, K = never, V = never>(): OperatorFunction<
        Map<typeof Safe | K, Safe<S, R> | V> | Safe<S, R>,
        R
    > {
        return (src$) =>
            src$.pipe(
                select(Safe),
                filter((v) => v.type === SafeType.End),
                map((v: Safe<S, R>) => v.value)
            );
    }

    static SelectError<S, R, E = any, K = never, V = never>(): OperatorFunction<
        Map<typeof Safe | K, Safe<S, R, E> | V> | Safe<S, R>,
        E
    > {
        return (src$) =>
            src$.pipe(
                select(Safe),
                filter((v) => v.type === SafeType.Success),
                map((v: Safe<S, R>) => v.error)
            );
    }
}
