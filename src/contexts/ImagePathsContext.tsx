import {createContext, ReactNode, useContext} from 'react';

interface ImagePathsContextType {
  name: string;
  value: string;
}

interface ImagePathProviderType {
  children: ReactNode;
}

const assetBasePath = '~/src/assets';
const values = [
  {
    name: 'announcementPreview1',
    value: `${assetBasePath}/announce-preview-1.png`,
  },
  {
    name: 'announcementPreview2',
    value: `${assetBasePath}/announce-preview-2.png`,
  },
  {name: 'bsuBg', value: `${assetBasePath}/bsu-bg.png`},
  {name: 'bsu', value: `${assetBasePath}/bsu.png`},
  {name: 'cics', value: `${assetBasePath}/cics.png`},
  {name: 'fileSent', value: `${assetBasePath}/file-sent.png`},
  {name: 'file', value: `${assetBasePath}/file.png`},
  {name: 'idea', value: `${assetBasePath}/idea.png`},
  {name: 'remove', value: `${assetBasePath}/remove.png`},
  {name: 'user', value: `${assetBasePath}/user1.png`},
];
const ImagePaths = createContext<ImagePathsContextType[]>(values);

const ImagePathProvider = ({children}: ImagePathProviderType) => {
  return <ImagePaths.Provider value={values}>{children}</ImagePaths.Provider>;
};

export const useImagePath = () => useContext(ImagePaths);
export default ImagePathProvider;
