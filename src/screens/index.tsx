import React from 'react';
import Login from '~/screens/authentication/Login';
import Register from '~/screens/authentication/Register';
import Chats from '~/screens/dashboard/Complaints';
import Home from '~/screens/dashboard/Home';
import Announcements from '~/screens/dashboard/Announcements';
import UniversitySchedule from '~/screens/dashboard/CalendarOfActivities';
import UserInfo from '~/screens/dashboard/UserInfo';
import ProjectSuggestions from '~/screens/project_suggestions/ProjectSuggestions';
import Landing from '~/screens/authentication/Landing';

import HeaderDefault from '~/components/Header';
import Loading from '~/screens/shared/Loading';

const Screens = [
  Login,
  Register,
  Chats,
  Home,
  Announcements,
  UniversitySchedule,
  UserInfo,
  ProjectSuggestions,
  Landing,
  Loading,
];

const Header = () => {
  return <HeaderDefault withBack />;
};

export const optionsList = [
  {name: UserInfo.name, options: {headerShown: false}},
  {name: ProjectSuggestions.name, options: {header: Header}},
  {name: Landing.name, options: {headerShown: false}},
  {name: Loading.name, options: {headerShown: false}},
];

export default Screens;
