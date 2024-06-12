export const updateAlert = (alert, alertContent) => {
  alert.show = alertContent.show
  alert.type = alertContent.type
  alert.title = alertContent.title
  alert.text = alertContent.text
}
