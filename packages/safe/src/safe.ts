import { merge, Notification } from "rxjs";
import { OperatorFunction } from "rxjs/internal/types";
import { map, materialize, startWith } from "rxjs/operators";

export enum SafeType {
    Initialize = "Initialize",
    Start = "Start",
    End = "End",
    Error = "Error",
    Success = "Success",
}

export type SafePart<T extends PropertyKey = PropertyKey, V = any> = {
    [N in T]: V;
};

export class Safe<S = any, R = any, T extends SafePart = {}> {
    private currentParts = new Map<keyof T, T[keyof T]>();
    private partsKeys = new Set<keyof T>();

    id: symbol;
    type: SafeType;
    startValue?: S;
    value?: R;
    error?: any;

    constructor({ id = Symbol(), type, startValue, value, error }: Partial<Safe<S, R, T>> = {}) {
        this.id = id;
        this.type = type;
        this.startValue = startValue;
        this.value = value;
        this.error = error;
    }

    get isComplete() {
        return this.type === SafeType.Success || this.type === SafeType.Error;
    }

    get parts() {
        return Object.fromEntries(this.currentParts.entries()) as Partial<T>;
    }

    get keys() {
        return Array.from(this.partsKeys.values());
    }

    set<P extends keyof T>(partName: PropertyKey, value: T[P]) {
        this.currentParts.set(partName, value);
    }

    add<P extends PropertyKey, V extends any>(partName: P, value?: V) {
        this.partsKeys.add(partName);
        if (arguments.length >= 2) {
            this.set(partName, value as any);
        }
        return this as Safe<S, R, T & SafePart<P, V>>;
    }

    del<P extends keyof T>(partName: P) {
        this.partsKeys.delete(partName);
        this.currentParts.delete(partName);
    }

    get<P extends keyof T>(partName: P) {
        return this.currentParts.get(partName) as T[P];
    }

    has(partName: keyof T) {
        return this.partsKeys.has(partName);
    }

    notEmpty(partName: keyof T) {
        return this.currentParts.has(partName);
    }

    create(instance: Partial<Safe<S, R, T>>) {
        return new Safe({ ...this, ...instance });
    }
}

export type PartsObject<S extends Safe<any, any, any>> = S extends Safe<any, any, infer T> ? T : never;

/**
 * Make safe operator
 */
export function makeOperatorSafe<F extends (...args: any[]) => OperatorFunction<any, Safe>>(
    operatorFn: (...args: Parameters<F>) => OperatorFunction<Safe, Safe>
): F {
    return ((...args: Parameters<F>) => {
        const operator = operatorFn(...args);
        return (src$) => {
            const safeStart$ = src$.pipe(map((startValue) => new Safe({ type: SafeType.Start, startValue })));
            return merge(safeStart$, safeStart$.pipe(operator)).pipe(
                startWith(new Safe({ type: SafeType.Initialize }))
            );
        };
    }) as F;
}

const KIND_TO_TYPE: { [N in Notification<any>["kind"]]: SafeType } = {
    C: SafeType.Success,
    E: SafeType.Error,
    N: SafeType.End,
};

/**
 * Operator for make safe operator safe end
 */
export function toSafeEnd<T, R>(safeStart: Safe<T, R>): OperatorFunction<R, Safe<T, R>> {
    return (src$) =>
        src$.pipe(
            materialize(),
            map(({ kind, value, error }) =>
                safeStart.create({
                    type: KIND_TO_TYPE[kind],
                    value,
                    error,
                })
            )
        );
}
