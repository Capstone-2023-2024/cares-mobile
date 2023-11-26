export const login = 'Login';
export const register = 'Register';

export const chats = 'Complaints';
export const home = 'Home';
export const announce = 'Announcements';
export const schedule = 'CalendarOfActivities';
export const userInfo = 'UserInfo';
export const projSug = 'ProjectSuggestions';

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
] as const;
export const pathWithoutUserList = [login, register, landing, loading] as const;

export type PathsWithUserListType = (typeof pathWithUserList)[number];
export type PathsWithoutUserListType = (typeof pathWithoutUserList)[number];
