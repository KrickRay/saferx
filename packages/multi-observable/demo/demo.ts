import { MultiObservable } from "@saferx/multi-observable";
import { of } from "rxjs";

const multiObservableName$ = new MultiObservable(of({ name: "Test", age: 20 }), "name"); // return only 'name': 'Test'
const age$ = multiObservableName$.get("age"); // return only 'age': 20
