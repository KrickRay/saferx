import { api } from "./api";
import { UserService } from "./demo";

describe("Demo", () => {
    it("should return user", (done) => {
        const user = new UserService(api);
        user.user$.subscribe((user) => expect(user).toEqual({ id: 1, name: "Test", email: "test@tes.t" }), null, done);
        user.loadUser({ id: 1 });
        user.loadUser.complete();
    });
});
