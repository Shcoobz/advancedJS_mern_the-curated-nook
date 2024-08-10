export function replaceHtmlEntities(str) {
  return str.replace(/&quot;/g, '"');
}

export function truncateText(description, maxLength = 250) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + ' [...]';
  }

  return description;
}

export function formatDate(dateString) {
  if (dateString === '1900-01-01') {
    return 'N/A';
  }

  const date = new Date(dateString);
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  const year = date.getFullYear();

  day = day.length < 2 ? '0' + day : day;
  month = month.length < 2 ? '0' + month : month;

  return `${day}-${month}-${year}`;
}
