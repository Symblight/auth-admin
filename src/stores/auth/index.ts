import { Request } from 'libs/api';

export interface AuthStoreProps {
  auth: boolean;
  profile: TProfile;
  setProfile: (name: Value) => void;
  setAuth: () => void;
  getProfile: () => void;
  checkLogin: () => void;
}

type TProfile = {
  email: string;
  username: string;
};

type Value = {
  email: string;
  password: string;
};

export function authStore() {
  return {
    mobxLoggerConfig: {
      methods: {
        myAction: false,
      },
    },
    auth: false,
    profile: {
      email: 'test',
      username: 'test',
    } as TProfile,
    setProfile(values: Value) {
      this.profile = { ...this.profile, ...values };
    },
    setAuth() {
      this.auth = true;
    },
    get getProfile() {
      return this.profile;
    },
    async checkLogin() {
      try {
        const data = await Request({
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/todos/1',
        });
      } catch (error) {
        console.log(error);
      }
    },
  };
}
