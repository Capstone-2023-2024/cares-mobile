export const login = 'Login';
export const register = 'Register';

export const chats = 'Chats';
export const home = 'Home';
export const announce = 'Announcements';
export const schedule = 'UniversitySchedule';
export const userInfo = 'UserInfo';
export const projSug = 'ProjectSuggestions';
export const writeSug = 'WriteSuggestions';

export const landing = 'Landing';
export const loading = 'Loading';

export const pathWithUserList = [
  home,
  loading,
  userInfo,
  schedule,
  announce,
  chats,
  projSug,
  writeSug,
] as const;
export const pathWithoutUserList = [login, register, landing, loading] as const;

export type PathsWithUserListType = (typeof pathWithUserList)[number];
export type PathsWithoutUserListType = (typeof pathWithoutUserList)[number];
