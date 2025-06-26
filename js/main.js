import { marked } from './marked.esm.js'

const onLoaded = () => {
  //
  let namedWindow = null

  const listActionOpenUrl = document.querySelectorAll(
    '[data-action="open-url"]',
  )

  const onClickOpenNamedWindow = (event) => {
    event.preventDefault()
    const url = event.currentTarget.dataset.url

    console.log(url)

    openInNamedWindow(url)
  }

  listActionOpenUrl.forEach((item) => {
    item.addEventListener('click', onClickOpenNamedWindow)
  })

  function openInNamedWindow(request) {
    console.log(request)

    const synonym = document.querySelector('#synonym')?.textContent || ''

    const requestUrl = request.replace('%synonym%', synonym)

    const windowName = 'myBrowser' // уникальное имя окна
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
  const buttonNextStep = document.querySelector('button.next')

  const onClickButtonNextStep = () => {
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
    } else {
      document.querySelector('.message').classList.add('message--hidden')
    }
  }

  buttonNextStep?.addEventListener('click', onClickButtonNextStep)

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
      !event.target.classList.contains('dropdown__toggle') &&
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

  // dropdown
  const listDropdownToggles = document.querySelectorAll('.dropdown__toggle')

  const onClickDropdownToggle = (event) => {
    const dropdownToggle = event.target
    const dropdown = dropdownToggle.closest('.dropdown')
    const dropdownContent = dropdown.querySelector('.dropdown__content')

    dropdownContent.classList.toggle('show')

    // если показываем dropdown
    if (dropdownContent.classList.contains('show')) {
      // покажем кнопку "закрыть" dropdown

      if (!dropdownContent.querySelector('.dropdown__close')) {
        const dropdownClose = document.createElement('button')
        dropdownClose.classList.add('dropdown__close')

        dropdownClose.addEventListener('click', () => {
          dropdownContent.classList.remove('show')
        })

        dropdownContent.appendChild(dropdownClose)
      }

      // проверим где кнопка dropdownToggle - в верхней или в нижней половине экрана
      // чтоб понять куда вываливать dropdown__content
      const rect = dropdown.getBoundingClientRect()

      if (
        window.innerHeight - rect.y >=
        Math.abs(window.innerHeight / 2 - rect.y)
      ) {
        // раскрыть вниз
        dropdownContent.style.top = dropdownToggle.clientHeight + 'px'
      } else {
        // раскрыть вверх
        dropdownContent.style.bottom = dropdownToggle.clientHeight + 'px'
      }
    } else {
    }

    dropdownToggle.classList.toggle('show')
  }

  listDropdownToggles.forEach((button) => {
    button.addEventListener('click', onClickDropdownToggle)
  })
  // end dropdown

  const continueStepDuration = () => {
    const timerInterval = setInterval(onTimer, 60 * 1000)
  }

  // нажимаем .step__action - делаем активный step

  continueStepDuration()
}

document.addEventListener('DOMContentLoaded', onLoaded)
