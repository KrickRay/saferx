import { from, ObservableInput } from "rxjs";
import { OperatorFunction } from "rxjs/internal/types";
import { concatMap } from "rxjs/operators";
import { makeOperatorSafe, Safe, toSafeEnd } from "../../safe";

export const safeConcatMap = makeOperatorSafe<
    <T, R>(project: (value: T, index: number) => ObservableInput<R>) => OperatorFunction<T, Safe<T, R>>
>((project) => concatMap((value, index) => from(project(value.startValue, index)).pipe(toSafeEnd(value))));
