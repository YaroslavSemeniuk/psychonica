const dataParser = (data) => {
  const obj = {
    message: undefined,
    link: undefined,
  };
  obj.message = data.message;
  obj.link = data.imgUrl;
  return obj;
};

module.exports = { dataParser };
