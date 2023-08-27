import CreatePass from '~/screens/authentication/CreatePass';
import ForgotPass from '~/screens/authentication/ForgotPass';
import Login from '~/screens/authentication/Login';
import Register from '~/screens/authentication/Register';
import VerificationCode from '~/screens/authentication/VerificationCode';
import Chats from '~/screens/dashboard/Chats';
import Home from '~/screens/dashboard/Home';
import Announcements from '~/screens/dashboard/Announcements';
import UniversitySchedule from '~/screens/dashboard/UniversitySchedule';
import UserInfo from '~/screens/dashboard/UserInfo';
import ProjectSuggestions from '~/screens/project_suggestions/ProjectSuggestions';
import Application from '~/screens/special_class/Application';
import Request from '~/screens/special_class/Request';
import Takers from '~/screens/special_class/Takers';
import WriteSuggestion from '~/screens/project_suggestions/WriteSuggestions';
import LandingScreen from '~/screens/LandingScreen';

import HeaderDefault from '~/components/Header';

const Screens = [
  CreatePass,
  ForgotPass,
  Login,
  Register,
  VerificationCode,
  Chats,
  Home,
  Announcements,
  UniversitySchedule,
  UserInfo,
  ProjectSuggestions,
  WriteSuggestion,
  Application,
  Request,
  Takers,
  LandingScreen,
];

const Header = () => {
  return <HeaderDefault withBack />;
};

export const optionsList = [
  {name: UserInfo.name, options: {headerShown: false}},
  {name: ProjectSuggestions.name, options: {header: Header}},
  {name: WriteSuggestion.name, options: {header: Header}},
  {name: LandingScreen.name, options: {headerShown: false}},
];

export default Screens;
