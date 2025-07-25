import md5 from "md5";

export function getGravatar(email, s = 80, d = "mp", r = "g", img = false, atts = {}) {
  let url = "https://www.gravatar.com/avatar/";
  url += md5(email.trim().toLowerCase());
  url += `?s=${s}&d=${d}&r=${r}`;

  if (img) {
    let imgTag = `<img src="${url}"`;
    for (const [key, val] of Object.entries(atts)) {
      imgTag += ` ${key}="${val}"`;
    }
    imgTag += " />";
    return imgTag;
  }

  return url;
}

export function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function getCurrentFormattedDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
