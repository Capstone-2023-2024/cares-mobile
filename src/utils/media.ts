import RNFS, {type DownloadFileOptions} from 'react-native-fs';

// type DownloadFileOptions = {
//   fromUrl: string;          // URL to download file from
//   toFile: string;           // Local filesystem path to save the file to
//   headers?: Headers;        // An object of headers to be passed to the server
//   background?: boolean;     // Continue the download in the background after the app terminates (iOS only)
//   discretionary?: boolean;  // Allow the OS to control the timing and speed of the download to improve perceived performance  (iOS only)
//   cacheable?: boolean;      // Whether the download can be stored in the shared NSURLCache (iOS only, defaults to true)
//   progressInterval?: number;
//   progressDivider?: number;
//   begin?: (res: DownloadBeginCallbackResult) => void; // Note: it is required when progress prop provided
//   progress?: (res: DownloadProgressCallbackResult) => void;
//   resumable?: () => void;    // only supported on iOS yet
//   connectionTimeout?: number // only supported on Android yet
//   readTimeout?: number       // supported on Android and iOS
//   backgroundTimeout?: number // Maximum time (in milliseconds) to download an entire resource (iOS only, useful for timing out background downloads)
// };

async function downloadPhoto(FILE_URL: string) {
  const date = new Date();
  const options: DownloadFileOptions = {
    fromUrl: FILE_URL,
    toFile: `${RNFS.DownloadDirectoryPath}/${date.getTime()}.jpg`,
  };
  const {promise} = RNFS.downloadFile(options);
  try {
    const result = await promise;
    console.log({result});
  } catch (err) {
    console.log(err);
  }
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
