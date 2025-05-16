const onLoaded = () => {
  const onClickDocument = function (event) {
    if (
      !event.target.classList.contains('dropdown-toggle') &&
      !event.target.closest('.show')
    ) {
      document.querySelectorAll('.show').forEach((item) => {
        item.classList.remove('show')
      })
    }
  }

  document.addEventListener('click', onClickDocument)

  //
  const buttonSidebarToggle = document.querySelector('.sidebar button.toggle')
  const sidebar = document.querySelector('.sidebar')
  const onClickButtonSidebarToggle = () => {
    sidebar.classList.toggle('sidebar--hidden')
  }
  buttonSidebarToggle.addEventListener('click', onClickButtonSidebarToggle)

  const messages = document.querySelector('.messages')
  const buttonMessagesClose = document.querySelector('.messages button.close')

  const onClickButtonMessagesClose = () => {
    messages.classList.add('messages--hidden')
  }

  buttonMessagesClose.addEventListener('click', onClickButtonMessagesClose)

  const profileContent = document.querySelector('.profile__content')

  const profileButton = document.querySelector('.profile button')

  const onClickProfileButton = () => {
    profileButton.classList.toggle('show')
    profileContent.classList.toggle('show')
  }

  profileButton.addEventListener('click', onClickProfileButton)
}

document.addEventListener('DOMContentLoaded', onLoaded)
