function upperCaseFirst(str: string): string {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}

function getDate(date: string): string {
  return `${new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })}`;
}

function getRatingWidth(rating: number): string {
  let ratingWidth = String(rating * 20);
  ratingWidth += '%';
  return ratingWidth;
}

export {upperCaseFirst, getDate, getRatingWidth};
