export const resolveImageSource = (image: any) => {
  return typeof image === 'string' ? {uri: image} : image;
};
