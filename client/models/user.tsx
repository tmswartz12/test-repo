import { Action, thunk, action, Thunk, ActionOn, actionOn } from "easy-peasy";
import { User } from "../types/user";
import { apiCaller } from "../util/apiCaller";
import { setAuthCookie } from "../util/cookies";
import history from "../history";

export interface UserModel {
  data: User;
  setUser: Action<UserModel, User>;
  getUser: Thunk<UserModel>;
  register: Thunk<UserModel, { email: string }>;
}

const initialUser: User = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  isAdmin: false,
  onboardingStatus: "userInfo",
};

const user: UserModel = {
  data: initialUser,
  setUser: action((state, payload) => {
    state.data = payload;
  }),
  getUser: thunk(async (actions) => {
    try {
      const { data } = await apiCaller("api/user/", "get", null);
      const user = data.user;
      actions.setUser(user);
    } catch (err) {
      console.log("err", err);
    }
  }),
  register: thunk(async (actions, payload) => {
    try {
      const { data } = await apiCaller("api/user/signup", "post", payload);
      console.log("data", data);
      const user = data.user;
      const authToken = data.authToken;
      setAuthCookie(user._id, authToken);
      actions.setUser(user);
      history.push("/onboarding");
    } catch (err) {
      console.log("err", err);
    }
  }),
};

export default user;
