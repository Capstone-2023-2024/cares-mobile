export const imageStyle = {opacity: 0.7};
export const icon = 80;
export const imageDimension = (dimension: number) => {
  return {width: dimension, height: dimension};
};

export const assetBasePath =
  'https://firebasestorage.googleapis.com/v0/b/cares-dummy.appspot.com/o/icons%2F';

export const uri = (id: string) => `${assetBasePath}${id}?alt=media`;
