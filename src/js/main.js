import '../scss/style.scss'

const dom = {
    submitBtn: document.querySelector('.submit__btn'),
    userName: document.querySelector('#user'),
    userComment: document.querySelector('#comment'),
    localTime: document.querySelector('#date'),
    commentsForm: document.querySelector('.comments__container'),
    form: document.querySelector('#add-form')
}

const feedbackArr = [];

dom.submitBtn.addEventListener('click', submitFeedback);
dom.form.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        submitFeedback(e);
    }
})

function submitFeedback(e) {
    const commentName = dom.userName.value;
    const commenBody = dom.userComment.value;
    const commenTime = dom.localTime.value;
    const timestamp = Date.now();
    if (formValidate(this) === true) {
        const newFeedback = {
            id: timestamp,
            commentName,
            commenBody,
            time: commenTime,
        }
        feedbackArr.push(newFeedback);
        resetForm();
        addFeedback(newFeedback);
    }
    e.preventDefault();
}

function formValidate() {

    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove()
            parent.classList.remove('error')
        }
    }

    function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('label')

        errorLabel.classList.add('error-label')
        errorLabel.textContent = text;

        parent.classList.add('error')
        parent.append(errorLabel)
    }

    let result = true;
    const form = dom.form;
    form.querySelectorAll('._req').forEach(input => {
        removeError(input)
        if (input.value == '') {
            createError(input, 'Пожалуйста заполните поле');
            result = false;
        }
    })
    return result;
}

function resetForm() {
    dom.userName.value = '';
    dom.userComment.value = '';
    dom.localTime.value = '';
}

function addFeedback(item) {
    console.dir(item)
    const div = document.createElement('div');
    div.classList = 'comment__card';
    div.id = item.id;
    div.innerHTML = `
    <div id=${item.id} class="comment__info">
      <div class="comment__name">
        <small class="nickname">${item.commentName}</small>
        <span class="date">${item.time}</span>
        <div class="delet">
          <i class="_icon-bin"></i>
        </div>
      </div>
      <p class="comment__body">
      ${item.commenBody}
      </p>
      <div class="favorite">
        <i class="_icon-far"></i>
      </div>
    </div>`

    dom.commentsForm.insertAdjacentElement('beforeend', div);
}

dom.commentsForm.addEventListener('click', function (event) {
    const target = event.target;
    const isDeletEl = target.parentNode.classList.contains('delet');
    if (isDeletEl) {
        const del = target.parentElement.parentElement.parentElement.parentElement
        del.remove()
    }
})

dom.commentsForm.addEventListener('click', function (event) {
    const target = event.target;
    const islikeEl = target.parentNode.classList.contains('favorite');
    if (islikeEl) {
        const color = target.childNodes
        console.dir(color)
    }
})

