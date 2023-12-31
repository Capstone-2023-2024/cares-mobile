import React from 'react';
import Landing from '~/screens/authentication/Landing';
import Login from '~/screens/authentication/Login';
import Register from '~/screens/authentication/Register';
import Announcements from '~/screens/dashboard/Announcements';
import UniversitySchedule from '~/screens/dashboard/CalendarOfActivities';
import Chats from '~/screens/dashboard/Complaints';
import Home from '~/screens/dashboard/Home';
import UserInfo from '~/screens/dashboard/UserInfo';
import ProjectSuggestions from '~/screens/project_suggestions';

import HeaderDefault from '~/components/Header';

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
];

const Header = () => {
  return <HeaderDefault withBack />;
};

export const optionsList = [
  {name: Chats.name, options: {headerShown: false}},
  {name: UserInfo.name, options: {headerShown: false}},
  {name: ProjectSuggestions.name, options: {header: Header}},
  {name: Landing.name, options: {headerShown: false}},
];

export default Screens;
