const onLoaded = () => {
  //

  const formatMinutesToHHMM = (minutes) => {
    const HH = (~~(minutes / 60)).toString().padStart(2, '0')
    const MM = (minutes % 60).toString().padStart(2, '0')

    return `${HH}:${MM}`
  }

  const popupsData = {
    1: `  <h2>Задача: "Изучение Заявки (запрос для рассылки)"</h2>
          <ul>
            <li>1.Прочтите и поймите Шаблон №А</li>
            <li>2.Введите в Шаблон №Б имя товара</li>
            <li>
              3.Введите имя товара в Интернет-Браузер и находите Синонимы имени
              товара
            </li>
            <li>4.Прочтите и поймите на 5-ти сайтах Синонимы имени</li>
            <li>5.Выберите 3 Синонима по их рейтингу на сайтах</li>
            <li>
              6.Введите их в Шаблон №Б 7.Введите их и имя товара в Переводчик
              Deep
            </li>
            <li>
              7.Переведите каждый Синоним на язык страны Поиска (Шаблон №А)
            </li>
            <li>8.Внесите результаты перевода в Шаблон №В</li>
            <li>9.Завершить Задачу</li>
           </ul>`,
  }

  const spanStepDuration = document.querySelector('span#step-duration')

  const startTimeMinutes = parseInt(
    window.localStorage.getItem('startTime') || 0,
  )

  console.log(startTimeMinutes)

  let timeDurationMinutes = startTimeMinutes

  spanStepDuration.textContent = formatMinutesToHHMM(timeDurationMinutes)

  const onTimer = () => {
    timeDurationMinutes += 1
    window.localStorage.setItem('startTime', timeDurationMinutes)

    spanStepDuration.textContent = formatMinutesToHHMM(timeDurationMinutes)
  }

  const continueStepDuration = () => {
    //
    const timerInterval = setInterval(onTimer, 60 * 1000)
  }

  const popup = document.querySelector('.popup')
  const popupContent = document.querySelector('.popup .content')

  const buttonsPopupShow = document.querySelectorAll('button.popup-show')

  const onClickButtonPopupShow = function (event) {
    const target = event.target

    const popupDataId = target.dataset.popup

    popupContent.innerHTML = popupsData[popupDataId]

    popup.classList.add('popup--show')
  }

  buttonsPopupShow.forEach((item) => {
    item.addEventListener('click', onClickButtonPopupShow)
  })

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

  const onClickSidebar = function (event) {
    if (event.target.classList.contains('sidebar--hidden')) {
      toggleSidebar()
    }
  }

  sidebar.addEventListener('click', onClickSidebar)

  const toggleSidebar = () => {
    sidebar.classList.toggle('sidebar--hidden')
  }

  const onClickButtonSidebarToggle = () => {
    toggleSidebar()
  }
  buttonSidebarToggle.addEventListener('click', onClickButtonSidebarToggle)

  const messages = document.querySelector('.messages')
  const buttonMessagesClose = document.querySelector('.messages button.close')

  const onClickButtonMessagesClose = () => {
    messages.classList.add('messages--hidden')
  }

  buttonMessagesClose.addEventListener('click', onClickButtonMessagesClose)

  const buttonPopupClose = document.querySelector('.popup button.close')

  const onClickButtonPopupClose = () => {
    document.querySelector('.popup--show').classList.remove('popup--show')
  }

  buttonPopupClose.addEventListener('click', onClickButtonPopupClose)

  const profileContent = document.querySelector('.profile__content')

  const profileButton = document.querySelector('.profile button')

  const onClickProfileButton = () => {
    profileButton.classList.toggle('show')
    profileContent.classList.toggle('show')
  }

  profileButton.addEventListener('click', onClickProfileButton)

  continueStepDuration()
}

document.addEventListener('DOMContentLoaded', onLoaded)
