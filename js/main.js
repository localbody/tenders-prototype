import { marked } from './marked.esm.js'

const onLoaded = () => {
  const countOperations = 5

  const phrase = 'эпоксидная смола'

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

    const postJSON = event.currentTarget.dataset.postJson

    if (postJSON) {
      //
      openInNamedWindow(url, postJSON)
    } else {
      openInNamedWindow(url)
    }
  }

  listActionOpenUrl.forEach((item) => {
    item.addEventListener('click', onClickOpenNamedWindow)
  })

  function openInNamedWindow(request, postJSON = null) {
    //
    const requestUrl = request.replace('%phrase%', phrase)

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

    if (postJSON) {
      const post = JSON.parse(postJSON)
      const params = post.params
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = post.url
      form.target = 'myBrowser' // имя окна должно совпадать!

      // добавляем поля POST-запроса
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = params[key]
          form.appendChild(input)
        }
      }
      document.body.appendChild(form)
      // debugger
      form.submit()
      document.body.removeChild(form)
    }
  }

  const currentUrl = new URL(window.location.href)
  const searchParams = new URLSearchParams(currentUrl.search)
  const searchString = searchParams.get('phrase') || phrase

  const listReplacementPhrase = document.querySelectorAll(
    '[data-replacement="phrase"]',
  )

  listReplacementPhrase.forEach((item) => {
    item.textContent = phrase
  })

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
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi temporibus, tempora distinctio deleniti dignissimos dolorum, expedita numquam nemo velit minima nulla necessitatibus nihil, voluptate magni quos earum soluta dolorem qui voluptas est. Quia, sed labore nam doloremque quibusdam architecto, quasi atque nemo nostrum suscipit vero! Aliquam mollitia neque reiciendis delectus. Laudantium, corrupti! Magni non ipsa itaque amet! Vel beatae facilis quo, deleniti accusamus tempore, impedit aspernatur, aperiam placeat eius doloribus doloremque quidem dicta ducimus! Repudiandae tempora necessitatibus accusamus. Eaque, perferendis nostrum minima modi quas dolor! Asperiores similique quidem doloremque natus voluptates! Porro cum suscipit asperiores harum dolores explicabo odio sit totam laudantium eveniet nam fugit nesciunt nihil laborum eaque vitae atque, quos nisi illo a eum delectus repudiandae? Optio laudantium tempora magni aut eius deserunt eos quia, at ipsum ullam commodi, repellat assumenda similique. Repudiandae deserunt veniam, minus accusantium quod quo dignissimos laborum, ea et maxime doloremque laudantium eaque sequi mollitia, quisquam expedita at animi quidem. Excepturi, fugiat? Aliquam asperiores saepe voluptatem ducimus nemo sed reprehenderit, nisi eius error tempora temporibus! Sapiente omnis enim molestias earum. Omnis aspernatur, ipsa odit eveniet exercitationem possimus numquam dolores accusamus vero ipsam neque deleniti fugit magnam, incidunt consequuntur, amet suscipit autem porro aliquid dicta laudantium sed nostrum iste facere. Eveniet voluptas quam officia voluptatem quos nulla laborum sed doloribus ullam rem alias molestias nemo reprehenderit similique soluta ab repellendus, odio culpa at aperiam quo. Repellendus minus aliquid accusantium dolores doloremque reprehenderit illum a officia officiis, minima neque consectetur exercitationem sed et esse eius nisi quod omnis earum itaque accusamus qui aspernatur! Consectetur minus assumenda voluptatem ipsam exercitationem possimus quod non in vero, amet quis necessitatibus nesciunt totam itaque eius eligendi ipsa rerum natus adipisci, tempora doloribus, pariatur magnam culpa facilis. Sint odio dolorum officiis esse debitis minima commodi a consectetur voluptatem quisquam nesciunt, vitae sequi explicabo libero accusantium? Magni adipisci veniam commodi! Quia veritatis deserunt, sint, culpa nisi quasi adipisci libero rem et minima perspiciatis quos modi commodi mollitia cupiditate? Nisi qui totam dolorem illo ad nulla blanditiis distinctio aliquid tempora! Est voluptate incidunt tenetur architecto doloremque! Animi mollitia placeat molestias, rem labore quia reiciendis vero doloremque, suscipit ad corrupti cupiditate deleniti necessitatibus nihil velit aperiam, est tempore quo praesentium in repellendus ut beatae! Eveniet rerum sint tenetur necessitatibus beatae, reiciendis voluptatem pariatur, perspiciatis aliquid quibusdam quae. Placeat ab accusantium ipsum ex facere labore rerum veniam id. Voluptatibus error dignissimos aliquam aperiam suscipit accusamus, nobis animi, a deserunt, perferendis enim debitis consequatur reiciendis velit quis quae eos voluptas? Libero eveniet perferendis facilis ipsum doloribus dignissimos voluptates, eaque eos rerum vel provident veniam quidem quo consequatur ex nihil nisi soluta dicta, esse, nam magnam. Ipsa ratione iure, aliquid nemo velit, dolorum consequuntur asperiores enim explicabo autem, harum nihil dolorem necessitatibus quas. Nulla distinctio possimus, quis corporis delectus veniam animi fugit dolorum odit iusto at provident, inventore vel eos doloribus ut nobis laboriosam aperiam autem suscipit. Debitis maxime, molestias explicabo modi est dolore repellendus odit illo incidunt praesentium perferendis nesciunt voluptatibus iusto voluptas cumque autem tempora perspiciatis ipsa tempore numquam suscipit commodi quam porro. Culpa, modi illo sint, aliquid sequi placeat aliquam quia ipsam, amet vel cumque ipsa unde! Porro repellat, inventore quibusdam eligendi beatae ipsam. Aut ea recusandae vero, atque illo amet asperiores ducimus corporis nesciunt quae necessitatibus consectetur assumenda aspernatur deleniti, architecto ullam facilis nihil commodi consequuntur quisquam eaque similique dolorem itaque. Alias possimus atque excepturi nobis facilis iste eos a, ad voluptates error quod quam iusto ex dignissimos velit quasi obcaecati sunt harum, officia nam reprehenderit fuga. Odio cupiditate ipsa eum ex minus architecto incidunt. Dolores a sed quaerat repellendus animi, id ut placeat quae vel reiciendis hic blanditiis porro excepturi laudantium explicabo ipsa illo iure, quas corporis, illum deleniti natus voluptate qui? Exercitationem incidunt esse eaque numquam provident recusandae, hic odio impedit asperiores ab nostrum voluptatum dolorem culpa ratione deserunt, dolor sapiente, cupiditate vitae mollitia quibusdam. Quia eaque ad eius reiciendis deserunt quos, amet quas voluptatibus non dolores, facere nulla laborum! Laborum magni voluptates quod aperiam facere beatae atque temporibus consequuntur autem ad aut mollitia libero fugit, nulla impedit ullam quaerat soluta tenetur fugiat molestias. Non, culpa repellendus est sunt, velit eum veritatis molestiae commodi porro dicta laudantium. Quod harum aut, assumenda illo neque praesentium blanditiis nesciunt excepturi id quo distinctio laborum atque aspernatur quae deserunt quaerat rem, corrupti modi eius eum deleniti expedita mollitia ullam. Voluptate odit accusantium tenetur sequi repellendus, quo impedit in. Ab accusamus exercitationem necessitatibus ex nostrum veritatis labore ullam minima ea excepturi nihil deleniti ducimus molestiae saepe perspiciatis iure quod consectetur voluptatem odit libero nemo, voluptate soluta nisi. Commodi adipisci modi veritatis sed animi enim architecto quas sint repellendus porro! Asperiores nisi dignissimos quod fuga officia tenetur magni eum nemo similique amet! Nostrum ipsum quibusdam eveniet. Laboriosam laudantium iste in tenetur magni. Soluta culpa accusamus ipsa consectetur accusantium corporis, pariatur dolores eius, neque quam alias nemo praesentium obcaecati distinctio deleniti autem similique modi rem? Ex commodi est veritatis fugiat harum, beatae molestiae totam eius enim, incidunt autem labore accusamus quos perspiciatis provident iusto distinctio. Sequi porro excepturi iure laboriosam laudantium id, suscipit nemo molestiae harum eveniet? Ad, cupiditate tempore repudiandae soluta ex nostrum maiores nam quis dicta, sit rem. Nam odio error tenetur quia sapiente obcaecati voluptate reiciendis deserunt explicabo dicta nisi necessitatibus deleniti facilis vero aspernatur sit dolorum nihil odit cum, placeat impedit, fugiat iure. Nisi officia obcaecati quia totam dolorem ipsa in explicabo eos, saepe sed maiores vel unde, perferendis eum error ipsam. Vero nihil consequuntur ipsum! Commodi molestias obcaecati, unde nemo illo harum aliquid possimus sint atque minus soluta, magnam, nam iste fugit veniam temporibus? Enim accusamus suscipit ut fugiat iusto minima, facere libero quod culpa, nam, saepe nobis eos eaque placeat exercitationem! Nisi iure voluptate quis repudiandae doloremque laborum similique omnis, eum vel beatae, magni nam corporis dignissimos. Vero ipsa ipsam praesentium maxime doloribus architecto, velit sunt voluptates. Dolores expedita exercitationem, unde odit fuga quaerat eligendi dicta ipsum aliquid culpa veritatis tenetur officia quibusdam dolorem distinctio earum asperiores accusantium saepe sit similique pariatur! Tempora, alias laboriosam enim nostrum quisquam ipsam dolore fugit aperiam! Iure eaque blanditiis error, labore at deserunt quisquam obcaecati maiores, quod optio ratione distinctio?
`,
  }

  // const spanStepDuration = document.querySelector('span#step-duration')

  const startTimeMinutes = parseInt(
    window.localStorage.getItem('startTime') || 0,
  )

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
      const popupContentDescription = popup.querySelector(
        '.popup__content .description',
      )

      popupContentDescription.innerHTML = marked.parse(
        popupsContent[popupContentId],
      )
    }

    popup.classList.add('popup--show')
  }

  const onClickButtonPopupOpen = function (event) {
    const target = event.target

    console.log(target)

    const popupName = target.dataset.popupName
    const popupContentId = target.dataset.popupContentId
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

  const closePopups = () => {
    document.querySelector('.popup--show').classList.remove('popup--show')
  }

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

    operation.classList.remove('operation--current')

    const operationPrev = document.querySelector(
      `[data-operation-id="${prevOperationId}"]`,
    )

    operationPrev.classList.remove('operation--complete')
    operationPrev.querySelector('.operation__body').hidden = false

    operationPrev.classList.add('operation--current')
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
      operation.classList.remove('operation--current')
      operation.classList.add('operation--complete')
      operation.querySelector('.operation__body').hidden = true

      document
        .querySelector(`[data-operation-id="${nextOperationId}"]`)
        .classList.add('operation--current')
    } else {
      operation.classList.remove('operation--current')
      operation.classList.add('operation--complete')
      operation.querySelector('.operation__body').hidden = true

      document.querySelector('[data-show="task-complete"]').hidden = false

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

    if (checkboxWantStopTask.checked) {
      document.querySelector('#resume-want-stop-task textarea').focus()
    }
  })

  // END want-stop-task

  // .operation

  const listOperations = document.querySelectorAll('.operation')

  const onClickOperation = (event) => {
    // если не кликнули по ДАЛЕЕ
    if (event.target.matches('button[data-action="next"]')) return

    if (event.currentTarget.classList.contains('operation--complete')) {
      event.currentTarget.querySelector('.operation__body').hidden =
        !event.currentTarget.querySelector('.operation__body').hidden
    }
  }

  listOperations.forEach((operation) => {
    operation.addEventListener('click', onClickOperation)
  })

  // END .operation

  // check-task

  const buttonCheckTask = document.querySelector('[data-action="check-task"]')

  const onClickCheckTask = () => {
    closePopups()

    document.querySelectorAll('.operation__body').forEach((item) => {
      item.hidden = false
    })
  }

  buttonCheckTask.addEventListener('click', onClickCheckTask)

  // END check-task

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
