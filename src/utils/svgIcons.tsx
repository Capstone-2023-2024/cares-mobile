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

// const svgIconBasePath = `~/assets/svg/icons`;
// const DIMENSION = 120;
// const uri = {
//   award: `${svgIconBasePath}/Award.svg`,
//   back: `${svgIconBasePath}/Back.svg`,
//   bookmark: `${svgIconBasePath}/Bookmark.svg`,
//   chatSupport: `${svgIconBasePath}/ChatSupport.svg`,
//   clip: `${svgIconBasePath}/Clip.svg`,
//   delete: `${svgIconBasePath}/Delete.svg`,
//   document: `${svgIconBasePath}/Document.svg`,
//   edit: `${svgIconBasePath}/Edit.svg`,
//   filter: `${svgIconBasePath}/Filter.svg`,
//   hamburger: `${svgIconBasePath}/Hamburger.svg`,
//   menuDots: `${svgIconBasePath}/Menudots.svg`,
//   message: `${svgIconBasePath}/Message.svg`,
//   next: `${svgIconBasePath}/Next.svg`,
//   notification: `${svgIconBasePath}/Notification.svg`,
//   pdf: `${svgIconBasePath}/Pdf.svg`,
//   photos: `${svgIconBasePath}/Photos.svg`,
//   pin: `${svgIconBasePath}/Pin.svg`,
//   pinRed: `${svgIconBasePath}/Pinred.svg`,
//   replyAll: `${svgIconBasePath}/ReplyAll.svg`,
//   send: `${svgIconBasePath}/Send.svg`,
//   specialClass: `${svgIconBasePath}/SpecialClass.svg`,
//   specialClass2: `${svgIconBasePath}/SpecialClass2.svg`,
//   user: `${svgIconBasePath}/User.svg`,
//   vote: `${svgIconBasePath}/Vote.svg`,
// };

// export const Award = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.award} />
// );
// export const Back = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.back} />
// );
// export const Bookmark = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.bookmark} />
// );
// export const ChatSupport = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.chatSupport} />
// );
// export const Clip = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.clip} />
// );
// export const Delete = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.delete} />
// );
// export const Document = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.document} />
// );
// export const Edit = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.edit} />
// );
// export const Filter = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.filter} />
// );
// export const Hamburger = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.hamburger} />
// );
// export const Menudots = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.menuDots} />
// );
// export const Message = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.message} />
// );
// export const Next = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.next} />
// );
// export const Notification = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.notification} />
// );
// export const Pdf = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.pdf} />
// );
// export const Photos = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.photos} />
// );
// export const Pin = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.pin} />
// );
// export const Pinred = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.pinRed} />
// );
// export const ReplyAll = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.replyAll} />
// );
// export const Send = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.send} />
// );
// export const SpecialClass = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.specialClass} />
// );
// export const SpecialClass2 = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.specialClass2} />
// );
// export const User = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.user} />
// );
// export const Vote = () => (
//   <SvgUri width={DIMENSION} height={DIMENSION} uri={uri.vote} />
// );
