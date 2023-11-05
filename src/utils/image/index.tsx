import React from 'react';
import {View} from 'react-native';
import {SvgUri as SVG} from 'react-native-svg';
import {Text} from '~/components';
import {uri} from './utils';
import type {SvgProps} from './types';

const SvgFallback = () => {
  return (
    <View>
      <Text>Svg Fall Back</Text>
    </View>
  );
};

const Svg = ({id}: SvgProps) => {
  return (
    <SVG
      width="100%"
      height="100%"
      uri={uri(id)}
      fallback={<SvgFallback />}
      // onError={() =>
      //   setUri('https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/ruby.svg')
      // }
    />
  );
};

export const AwardSvg = () => <Svg id="award.svg" />;
export const BackSvg = () => <Svg id="back.svg" />;
export const BookmarkSvg = () => <Svg id="bookmark.svg" />;
export const ChatsendSvg = () => <Svg id="chatsend.svg" />;
export const ClipSvg = () => <Svg id="clip.svg" />;
export const DelSvg = () => <Svg id="del.svg" />;
export const DocumentSvg = () => <Svg id="document.svg" />;
export const DotsSvg = () => <Svg id="dots.svg" />;
export const EditSvg = () => <Svg id="edit.svg" />;
export const EmojiSvg = () => <Svg id="emoji.svg" />;
export const FilterSvg = () => <Svg id="filter.svg" />;
export const GoogleSvg = () => <Svg id="google.svg" />;
export const HambrgSvg = () => <Svg id="hambrg.svg" />;
export const MessageSvg = () => <Svg id="message.svg" />;
export const NextSvg = () => <Svg id="next.svg" />;
export const NotifSvg = () => <Svg id="notif.svg" />;
export const PdfSvg = () => <Svg id="pdf.svg" />;
export const PhotoSvg = () => <Svg id="photo.svg" />;
export const PinSvg = () => <Svg id="pin.svg" />;
export const SendSvg = () => <Svg id="send.svg" />;

export function retrieveImageFBStorage(photoUrl: string[]) {
  const BASE = 'https://firebasestorage.googleapis.com';
  const BASE_DIVIDER = '/v0/b/';
  const STORAGE_BUCKET = 'cics-a78de.appspot.com';
  const PATH_DIVIDER = '/o/';
  const PARAMS = '?alt=media';
  const PATH = photoUrl[0]?.replace(/\//g, '%2F');
  const FULL_PATH = `${BASE}${BASE_DIVIDER}${STORAGE_BUCKET}${PATH_DIVIDER}images%2F${PATH}${PARAMS}`;
  return FULL_PATH;
}
