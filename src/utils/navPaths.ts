export const crtPass = 'CreatePass';
export const login = 'ForgotPass';
export const fgtPass = 'Login';
export const register = 'Register';
export const verCode = 'VerificationCode';

export const chats = 'Chats';
export const home = 'Home';
export const announce = 'Announcements';
export const schedule = 'UniversitySchedule';
export const userInfo = 'UserInfo';
export const projSug = 'ProjectSuggestions';
export const writeSug = 'WriteSuggestions';
export const scApp = 'Application';
export const scReq = 'Request';
export const scTakers = 'Takers';

export const landing = 'Landing';
export const loading = 'Loading';

export const pathWithUserList = [
  home,
  userInfo,
  schedule,
  announce,
  scApp,
  scReq,
  scTakers,
  chats,
  projSug,
  writeSug,
  loading,
] as const;
export const pathWithoutUserList = [
  crtPass,
  login,
  fgtPass,
  register,
  verCode,
  landing,
  loading,
] as const;

export type PathsWithUserListType = (typeof pathWithUserList)[number];
export type PathsWithoutUserListType = (typeof pathWithoutUserList)[number];
