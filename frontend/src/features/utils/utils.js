export function replaceHtmlEntities(str) {
  return str.replace(/&quot;/g, '"');
}

export function truncateText(description, maxLength = 250) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + ' [...]';
  }

  return description;
}
