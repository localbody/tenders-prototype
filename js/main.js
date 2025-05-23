import { marked } from './marked.esm.js'

const onLoaded = () => {
  //
  let namedWindow = null

  const listResultLink = document.querySelectorAll('.result__link')

  const onClickOpenNamedWindow = (event) => {
    event.preventDefault()
    const href = event.currentTarget.href
    openInNamedWindow(href)
  }

  listResultLink.forEach((item) => {
    item.addEventListener('click', onClickOpenNamedWindow)
  })

  function openInNamedWindow(request) {
    const synonym = document.querySelector('#synonym')?.textContent || ''

    const requestUrl = request.replace('%synonym%', synonym)

    const windowName = 'myChrome' // уникальное имя окна
    const windowFeatures = `left=${screen.availWidth / 2},top=0,width=${
      screen.availWidth / 2
    },height=${screen.availHeight},resizable=yes,scrollbars=yes,menubar=yes`

    if (!namedWindow || namedWindow.closed) {
      // Открываем новое окно при первом клике
      namedWindow = window.open(requestUrl, windowName, windowFeatures)
    } else {
      // Открываем ссылку в новой вкладке уже существующего окна
      namedWindow.focus()
      namedWindow.location.href = requestUrl
    }
  }

  //
  const buttonNextTask = document.querySelector('button.next-task')

  const onClickButtonNextTask = () => {
    const listResultText = document.querySelectorAll('.result__text')

    let showError = false

    listResultText.forEach((item) => {
      item.classList.remove('error')

      if (item.value == '') {
        item.classList.add('error')
        showError = true
      }
    })

    if (showError) {
      document.querySelector('.message').classList.remove('message--hidden')
    }
  }

  buttonNextTask?.addEventListener('click', onClickButtonNextTask)

  const currentUrl = new URL(window.location.href)
  const searchParams = new URLSearchParams(currentUrl.search)
  const searchString = searchParams.get('synonym') || '?synonym из url'

  const spanSynonym = document.querySelector('#synonym')

  if (spanSynonym) {
    spanSynonym.textContent = searchString
  }

  console.log(
    marked.parse('# Marked in the browser\n\nRendered by **marked**.'),
  )

  const formatMinutesToHHMM = (minutes) => {
    const HH = (~~(minutes / 60)).toString().padStart(2, '0')
    const MM = (minutes % 60).toString().padStart(2, '0')

    return `${HH}:${MM}`
  }

  const popupsData = {
    1: `
Тут будет подробная информация о Задаче: тут будут слова и фразы: "нажмите", "откройте", "запустите", "поисковая строка" ... 
## Задача: "Изучение Заявки (запрос для рассылки)"
1. Прочтите и поймите Шаблон №А
2. Введите в Шаблон №Б имя товара
3. Введите имя товара в Интернет-Браузер и находите Синонимы имени товара
4. Прочтите и поймите на 5-ти сайтах Синонимы имени
5. Выберите 3 Синонима по их рейтингу на сайтах
6. Введите их в Шаблон №Б 7.Введите их и имя товара в Переводчик Deep
7. Переведите каждый Синоним на язык страны Поиска (Шаблон №А)
8. Внесите результаты перевода в Шаблон №В
9. Завершить Задачу
`,
  }

  // const spanStepDuration = document.querySelector('span#step-duration')

  const startTimeMinutes = parseInt(
    window.localStorage.getItem('startTime') || 0,
  )

  console.log(startTimeMinutes)

  let timeDurationMinutes = startTimeMinutes

  // spanStepDuration.textContent = formatMinutesToHHMM(timeDurationMinutes)

  const onTimer = () => {
    timeDurationMinutes += 1
    window.localStorage.setItem('startTime', timeDurationMinutes)

    // spanStepDuration.textContent = formatMinutesToHHMM(timeDurationMinutes)
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

    popupContent.innerHTML = marked.parse(popupsData[popupDataId])

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

  const message = document.querySelector('.message')
  const buttonMessageClose = document.querySelector('.message button.close')

  const onClickButtonMessageClose = () => {
    message.classList.add('message--hidden')
  }

  buttonMessageClose.addEventListener('click', onClickButtonMessageClose)

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
