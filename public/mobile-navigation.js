const mobileNavigationSelector = "[data-mobile-navigation]"

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return

  const link = event.target.closest(`${mobileNavigationSelector} a[href^="#"]`)
  const navigation = link?.closest(mobileNavigationSelector)

  if (navigation instanceof HTMLDetailsElement) navigation.open = false
})

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !(event.target instanceof Element)) return

  const navigation = event.target.closest(mobileNavigationSelector)
  if (!(navigation instanceof HTMLDetailsElement) || !navigation.open) return

  event.preventDefault()
  navigation.open = false
  navigation.querySelector("summary")?.focus()
})
