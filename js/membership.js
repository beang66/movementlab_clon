document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-tier]').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('[data-tier]').forEach(function (el) { el.classList.remove('is-selected') })
      button.classList.add('is-selected')
    })
  })

  document.querySelectorAll('.membership-faq__button').forEach(function (button) {
    button.addEventListener('click', function () {
      const item = button.closest('.membership-faq__item')
      item.classList.toggle('is-open')
    })
  })
})
