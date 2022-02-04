export const openUrl = (url, newTab = true) => {
  const newWindow = window.open(url, newTab && '_blank', 'noopener,noreferrer')
  if (newWindow) {
    newWindow.opener = null
  }
}
