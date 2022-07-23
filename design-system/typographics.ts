import {TextStyle} from 'react-native';

const typographics: {
  [key: string]: TextStyle;
} = {
  title: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 25,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 17,
  },
  button: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 21,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  extrude: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  paragraph: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
  },
  textLink: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  textLabel: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
  action: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
  },
  display: {
    fontSize: 34,
    fontWeight: '600',
    lineHeight: 48,
  },
  caption: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 25,
  },
  price: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 22,
  },
  stroke: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
  },
};
export default typographics;
