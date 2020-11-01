export interface User {
    id: number;
    name: string;
    email: string;
}

export const api = {
    loadUser: (id: number) =>
        new Promise<User>((res) => setTimeout(() => res({ id, name: "Test", email: "test@tes.t" }), 100)),
};
