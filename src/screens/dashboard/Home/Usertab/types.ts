import type {PathListType} from '~/utils/navPaths/types';

export interface UsertabProps {
  name: string;
}

export interface HeadingTemplateProps {
  navigation: PathListType;
  title: string;
  disabled?: boolean;
}
