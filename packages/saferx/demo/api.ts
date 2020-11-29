export interface User {
    id: number;
    name: string;
    email: string;
}

export class API {
    loadUser(id: number) {
        return this.request({ id, name: "Test", email: "test@tes.t" });
    }

    private request<T>(v: T) {
        return new Promise<T>((res) => setTimeout(() => res(v), 100));
    }
}

export const api = new API();
