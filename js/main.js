import { marked } from './marked.esm.js'

const onLoaded = () => {
  const countOperations = 6

  const showMessage = (messageText) => {
    const message = document.querySelector('.message')
    const messageContent = message.querySelector('.message__content')

    messageContent.innerHTML = messageText
    message.classList.remove('message--hidden')
  }
  //
  let namedWindow = null

  const listActionOpenUrl = document.querySelectorAll(
    '[data-action="open-url"]',
  )

  const onClickOpenNamedWindow = (event) => {
    event.preventDefault()
    const url = event.currentTarget.dataset.url

    openInNamedWindow(url)
  }

  listActionOpenUrl.forEach((item) => {
    item.addEventListener('click', onClickOpenNamedWindow)
  })

  function openInNamedWindow(request) {
    //
    const synonym = document.querySelector('#synonym')?.textContent || 'трактор'

    const requestUrl = request.replace('%synonym%', synonym)

    const windowName = 'myBrowser' // уникальное имя окна
    const windowFeatures = `left=${window.innerWidth + 10},top=0,width=${
      screen.availWidth - window.innerWidth - 10
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

  const popupsContent = {
    1: `
# Задача: "Изучение Заявки (запрос для рассылки)"
---
## Тут будет подробная информация о Задаче: тут будут слова и фразы: "нажмите", "откройте", "запустите", "поисковая строка" и так далее.
---
1. Прочтите и поймите Шаблон №А
2. Введите в Шаблон №Б имя товара
3. Введите имя товара в Интернет-Браузер и находите Синонимы имени товара
4. Прочтите и поймите на 5-ти сайтах Синонимы имени
5. Выберите 3 Синонима по их рейтингу на сайтах
6. Введите их в Шаблон №Б 7.Введите их и имя товара в Переводчик Deep
7. Переведите каждый Синоним на язык страны Поиска (Шаблон №А)
8. Внесите результаты перевода в Шаблон №В
9. Завершить Задачу
---
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

  const listPopups = document.querySelectorAll('.popup')

  listPopups.forEach((popup) => {})

  const buttonsPopupOpen = document.querySelectorAll(
    '[data-action="popup-open"]',
  )

  const openPopup = (popupName, popupContentId = null) => {
    //
    const popup = document.querySelector(`[data-popup="${popupName}"]`)

    if (popupContentId) {
      const popupContent = popup.querySelector('.popup__content')

      popupContent.innerHTML = marked.parse(popupsContent[popupContentId])
    }

    popup.classList.add('popup--show')
  }

  const onClickButtonPopupOpen = function (event) {
    const target = event.target

    console.log(target)

    const popupName = target.dataset.popupName
    const popupContentId = target.dataset.popupContentId

    console.log(popupContentId)
    openPopup(popupName, popupContentId)
  }

  buttonsPopupOpen.forEach((item) => {
    item.addEventListener('click', onClickButtonPopupOpen)
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

  const listButtonPopupClose = document.querySelectorAll('.popup button.close')

  const onClickButtonPopupClose = () => {
    document.querySelector('.popup--show').classList.remove('popup--show')
  }

  listButtonPopupClose.forEach((buttonPopupClose) => {
    buttonPopupClose.addEventListener('click', onClickButtonPopupClose)
  })

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

  // нажимаем data-step="current" - делаем активный step
  const listStepCurrent = document.querySelectorAll('[data-step="current"]')

  const onClickStepCurrent = (event) => {
    const button = event.target
    document.querySelector('.step--current')?.classList.remove('step--current')

    const step = button.closest('.step')
    step.classList.add('step--current')
  }
  listStepCurrent.forEach((button) => {
    button.addEventListener('click', onClickStepCurrent)
  })

  // data-action="paste"

  const onClickButtonPaste = async (event) => {
    const text = await navigator.clipboard.readText()
    event.target.closest('.field').querySelector('input').value = text
  }

  const listButtonPaste = document.querySelectorAll('[data-action="paste"]')

  listButtonPaste.forEach((button) => {
    button.addEventListener('click', onClickButtonPaste)
  })

  // END data-action="paste"

  // data-action="prev"

  // data-action="prev"
  const listButtonPrev = document.querySelectorAll('[data-action="prev"]')

  const onClickButtonPrev = (event) => {
    const operation = event.target.closest('.operation')

    const prevOperationId = +operation.dataset.operationId - 1

    operation.classList.remove('operation--active')

    const operationPrev = document.querySelector(
      `[data-operation-id="${prevOperationId}"]`,
    )

    operationPrev.classList.remove('operation--complete')
    operationPrev.querySelector('.operation__body').hidden = false

    operationPrev.classList.add('operation--active')
  }

  listButtonPrev.forEach((button) => {
    button.addEventListener('click', onClickButtonPrev)
  })
  // END data-action="prev"

  // data-action="next"
  const listButtonNext = document.querySelectorAll('[data-action="next"]')
  const onClickButtonNext = (event) => {
    const operation = event.target.closest('.operation')

    const nextOperationId = +operation.dataset.operationId + 1

    if (nextOperationId < countOperations) {
      operation.classList.remove('operation--active')
      operation.classList.add('operation--complete')
      operation.querySelector('.operation__body').hidden = true

      document
        .querySelector(`[data-operation-id="${nextOperationId}"]`)
        .classList.add('operation--active')
    } else {
      openPopup('task-complete')
    }
  }

  listButtonNext.forEach((button) => {
    button.addEventListener('click', onClickButtonNext)
  })
  // END data-action="next"

  // data-action="check3items"

  // data-action="check3items"
  const listCheckboxCheck3Items = document.querySelectorAll(
    '[data-action="check3items"]',
  )
  const onChangeCheckbox = (event) => {
    const listCheckbox = event.target
      .closest('.fields')
      .querySelectorAll('[data-action="check3items"]')

    let countChecked = 0

    listCheckbox.forEach((checkbox) => {
      if (checkbox.checked) {
        countChecked++
      }
    })

    listCheckbox.forEach((checkbox) => {
      if (countChecked == 3 && !checkbox.checked) {
        checkbox.disabled = true
      } else {
        checkbox.disabled = false
      }
    })
  }

  listCheckboxCheck3Items.forEach((checkbox) => {
    checkbox.addEventListener('change', onChangeCheckbox)
  })

  // END data-action="check3items"

  // want-stop-task

  const checkboxWantStopTask = document.querySelector('#want-stop-task')

  checkboxWantStopTask?.addEventListener('change', () => {
    // debugger
    document.querySelector('#resume-want-stop-task').hidden =
      !document.querySelector('#resume-want-stop-task').hidden
  })

  // END want-stop-task

  // .operation

  const listOperations = document.querySelectorAll('.operation')

  const onClickOperation = (event) => {
    // если не кликнули по ДАЛЕЕ
    if (event.target.matches('button.next')) return

    if (event.currentTarget.classList.contains('operation--complete')) {
      event.currentTarget.querySelector('.operation__body').hidden =
        !event.currentTarget.querySelector('.operation__body').hidden
    }
  }

  listOperations.forEach((operation) => {
    operation.addEventListener('click', onClickOperation)
  })

  // END .operation

  continueStepDuration()
}

document.addEventListener('DOMContentLoaded', onLoaded)

// //
// const buttonNextStep = document.querySelector('button.next')

// const onClickButtonNextStep = () => {
//   const listResultText = document.querySelectorAll('.result__text')

//   let showError = false

//   listResultText.forEach((item) => {
//     item.classList.remove('error')

//     if (item.value == '') {
//       item.classList.add('error')
//       showError = true
//     }
//   })

//   if (showError) {
//     document.querySelector('.message').classList.remove('message--hidden')
//   } else {
//     document.querySelector('.message').classList.add('message--hidden')
//   }
// }

// buttonNextStep?.addEventListener('click', onClickButtonNextStep)
