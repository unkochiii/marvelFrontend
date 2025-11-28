const getImageUrl = (thumbnail) => {
  return `${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`;
};

export default getImageUrl;
