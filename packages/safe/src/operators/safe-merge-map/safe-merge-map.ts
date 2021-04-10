import { from, ObservableInput, OperatorFunction } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { toSafeEnd, Safe, makeOperatorSafe } from "../../safe";

export const safeMergeMap = makeOperatorSafe<
    <T, R>(project: (value: T, index: number) => ObservableInput<R>) => OperatorFunction<T, Safe<T, R>>
>((project) => mergeMap((v, i) => from(project(v.startValue, i)).pipe(toSafeEnd(v))));
