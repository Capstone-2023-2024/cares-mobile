import BlobCourier from 'react-native-blob-courier';

async function downloadPhoto(FILE_URL: string) {
  let date = new Date();
  const request = {
    android: {
      useDownloadManager: true, // <--- set useDownloadManager to "true"
    },
    filename: `${date.getTime()}.jpg`,
    method: 'GET',
    mimeType: 'image/jpeg',
    url: FILE_URL,
  };
  const fetchedResult = await BlobCourier.fetchBlob(request);
  console.log({fetchedResult});
  // let file_ext = '.jpg';

  // config: To get response by passing the downloading related options
  // fs: Root directory path to download
  // const {config, fs} = RNFetchBlob;
  // let RootDir = fs.dirs.PictureDir;
  // let options = {
  //   fileCache: true,
  //   addAndroidDownloads: {
  //     path:
  //       RootDir +
  //       '/file_' +
  //       Math.floor(date.getTime() + date.getSeconds() / 2) +
  //       file_ext,
  //     description: 'downloading file...',
  //     notification: true,
  //     // useDownloadManager works with Android only
  //     useDownloadManager: true,
  //   },
  // };
  // return await config(options).fetch('GET', FILE_URL);
}

export {downloadPhoto};
