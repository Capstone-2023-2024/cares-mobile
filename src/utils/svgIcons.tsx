const urlFormatter = (id: number, name: string) => {
  const host = 'https://www.svgrepo.com';
  const params = 'show';
  return `${host}/${params}/${id}/${name}.svg`;
};

export const arrowUri = urlFormatter(533621, 'arrow-sm-right');
export const pin = urlFormatter(527843, 'pin');
export const userSvg = urlFormatter(507442, 'user-circle');
export const menuDots = urlFormatter(525438, 'menu-dots');
export const inbox = urlFormatter(529652, 'inbox');
export const inboxUnread = urlFormatter(529649, 'inbox-unread');
export const idea = urlFormatter(474868, 'idea');
export const specialClass = urlFormatter(379677, 'task');

const svgIconBasePath = '~/assets/svg/icons';
// const DIMENSION = 120;
export const uri = {
  award: `${svgIconBasePath}/Award.svg`,
  back: `${svgIconBasePath}/Back.svg`,
  bookmark: `${svgIconBasePath}/Bookmark.svg`,
  chatSupport: `${svgIconBasePath}/ChatSupport.svg`,
  clip: `${svgIconBasePath}/Clip.svg`,
  delete: `${svgIconBasePath}/Delete.svg`,
  document: `${svgIconBasePath}/Document.svg`,
  edit: `${svgIconBasePath}/Edit.svg`,
  filter: `${svgIconBasePath}/Filter.svg`,
  hamburger: `${svgIconBasePath}/Hamburger.svg`,
  menuDots: `${svgIconBasePath}/Menudots.svg`,
  message: `${svgIconBasePath}/Message.svg`,
  next: `${svgIconBasePath}/Next.svg`,
  notification: `${svgIconBasePath}/Notification.svg`,
  pdf: `${svgIconBasePath}/Pdf.svg`,
  photos: `${svgIconBasePath}/Photos.svg`,
  pin: `${svgIconBasePath}/Pin.svg`,
  pinRed: `${svgIconBasePath}/Pinred.svg`,
  replyAll: `${svgIconBasePath}/ReplyAll.svg`,
  send: `${svgIconBasePath}/Send.svg`,
  specialClass: `${svgIconBasePath}/SpecialClass.svg`,
  specialClass2: `${svgIconBasePath}/SpecialClass2.svg`,
  user: `${svgIconBasePath}/User.svg`,
  vote: `${svgIconBasePath}/Vote.svg`,
};
