import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {authApp} from '~/utils/firebase';

interface InitialStateType {
  initialRouteName: 'Login' | 'Home';
  loading: boolean;
  currentUser: typeof authApp.currentUser;
}

type InitialStatePropType =
  | InitialStateType['initialRouteName']
  | InitialStateType['currentUser']
  | InitialStateType['loading'];

interface AuthContextType extends InitialStateType {
  signout: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
}
const initialState: InitialStateType = {
  loading: true,
  initialRouteName: 'Login',
  currentUser: null,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  signout: async () => {},
  signInWithEmail: async () => {},
});

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [state, setState] = useState(initialState);

  const handleState = (
    name: keyof InitialStateType,
    value: InitialStatePropType,
  ) => {
    setState(prevState => ({...prevState, [name]: value}));
  };

  async function signout() {
    await authApp.signOut();
  }
  async function signInWithEmail(email: string, password: string) {
    await authApp.signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsub = authApp.onAuthStateChanged(user => {
      handleState('loading', true);
      handleState('currentUser', user);
      handleState('initialRouteName', !user ? 'Login' : 'Home');
      handleState('loading', false);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signout,
        signInWithEmail,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
