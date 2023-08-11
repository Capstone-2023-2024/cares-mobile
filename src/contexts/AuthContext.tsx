import {type FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {
  type ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import {authApp} from '~/utils/firebase';

interface AuthContextType {
  loading: boolean;
  currentUser: FirebaseAuthTypes.User | null;
  signout: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  loading: false,
  currentUser: null,
  signout: async () => {},
  signInWithEmail: async () => {},
});

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] =
    useState<AuthContextType['currentUser']>(null);

  async function signout() {
    setLoading(true);
    await authApp.signOut();
  }

  async function signInWithEmail(email: string, password: string) {
    setLoading(true);
    await authApp.signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsub = authApp.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const values = {
    loading,
    currentUser,
    signout,
    signInWithEmail,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
