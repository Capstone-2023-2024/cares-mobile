async function downloadPhoto(FILE_URL: string) {
  console.log(FILE_URL);
  // let date = new Date();
  // let file_ext = '.jpg';

  // // config: To get response by passing the downloading related options
  // // fs: Root directory path to download
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
