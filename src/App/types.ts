import type {PathListType} from '~/utils/navPaths/types';
import type {StackNavigationOptions} from '@react-navigation/stack';

export interface StackType<T> {
  name: T;
  component: () => React.JSX.Element;
  options?: StackNavigationOptions;
}

export interface IteratePathsType {
  pathList: readonly PathListType[];
}
