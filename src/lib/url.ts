export function replaceBookViewInPath(pathname: string, newView: string) {
  const pathnameSplit = pathname.split("/");
  pathnameSplit[pathnameSplit.length - 1] = newView;
  return pathnameSplit.join("/");
}
