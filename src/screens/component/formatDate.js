const now = new Date();

export const nextDay = () => {
  const day = () => {
    if (now.getDate() < 10) {
      return '0' + (now.getDate() + 1);
    }
    return now.getDate();
  };
  const month = () => {
    if (now.getMonth() < 10) {
      return '0' + (now.getMonth() + 1);
    }
    return now.getDate();
  };
  const year = now.getFullYear();
  return year + '-' + month() + '-' + day();
};
export const formatDate = date => {
  const resDate = date
    .toISOString()
    .replace('-', '/')
    .split('T')[0]
    .replace('-', '/');
  return resDate;
};
const all = {formatDate, nextDay};
export default all;
