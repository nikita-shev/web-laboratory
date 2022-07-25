const $ = document.querySelector.bind(document),
      $$ = document.querySelectorAll.bind(document);

const body = $('body'),
      paddingScroll = window.innerWidth - body.offsetWidth,
      rightStyleBtnUp = window.getComputedStyle($('.btn-up')).getPropertyValue('right'),
      modal = $('.modal'),
      modalBody = $('.modal-body'),

      modalCloseBtn = $('.modal-body__btn'),

      navBarBtn = $('.nav-bar__btn'),
      workBtn = $('.work__btn'),
      courseBtn = $('.course__btn'),
      instructionBtn = $('.instruction__btn'),
      studentsBtn = $('.students__btn'),
      resultBtn = $('.result__btn'),
      bonusBtn = $('.bonus__btn'),
      tariffTestBtn = $('.tariff-test__btn'),
      tariffFullBtn = $('.tariff-full__btn'),

      modalStatus = $('.modal-status'),
      modalDialogStatus = $('.modal-dialog__status'),
      modalDialogBtn = $('.modal-dialog__btn');

const activeModalArr = [navBarBtn, workBtn, courseBtn, instructionBtn, studentsBtn,
                        resultBtn, bonusBtn, tariffTestBtn, tariffFullBtn],
      closeModalArr = [modal, modalCloseBtn, modalStatus, modalDialogBtn];

//================================= Open and Close modal =================================

const modalActive = (elem, elemBody, elemScroll) => {
    if (window.screen.width > 1024) { body.style.paddingRight = `${paddingScroll}px`; }
    body.style.overflow = 'hidden';

    elem.classList.add('modal-active');
    if (elemBody) { elemBody.classList.add('modal-active'); }
    if (elemScroll) { elemScroll.style.overflowY = 'scroll'; }

    if (window.screen.width > 1024) {
        $('.btn-up').style.right = `${parseInt(rightStyleBtnUp) + paddingScroll}px`;
    }
};

const modalClose = (elem, elemBody, elemScroll) => {
    body.removeAttribute('style');

    elem.classList.remove('modal-active');
    if (elemBody) { elemBody.classList.remove('modal-active'); }
    if (elemScroll) { elemScroll.removeAttribute('style'); }

    if (window.screen.width > 1024) {
        $('.btn-up').style.right = `${parseInt(rightStyleBtnUp)}px`;
    }

    $('.input__course').style.display = 'none';
};


activeModalArr.forEach((item) => {
    item.addEventListener('click', (e)=> {
        const target = e.target;

        if (target === navBarBtn) { modalActive(modal, modalBody, modal); }
        else if (target === workBtn) { modalActive(modal, modalBody, modal); }
        else if (target === courseBtn) { modalActive(modal, modalBody, modal); }
        else if (target === instructionBtn) { modalActive(modal, modalBody, modal); }
        else if (target === studentsBtn) { modalActive(modal, modalBody, modal); }
        else if (target === resultBtn) { modalActive(modal, modalBody, modal); }
        else if (target === bonusBtn) { modalActive(modal, modalBody, modal); }
        else if (target === tariffTestBtn || target === tariffFullBtn) {
            modalActive(modal, modalBody, modal);

            $('.input__course').style.display = 'block';
            $('.input__course').value = $(`.${target.getAttribute('data-tariff')}`).innerHTML;
        }
    });
});

closeModalArr.forEach((item) => {
   item.addEventListener('click', (e)=> {
       const target = e.target;

       if (target.matches('.modal') || target.matches('.modal-body__btn')) { modalClose(modal, modalBody, modal); }
       else if (target.matches('.modal-status') || target.matches('.modal-dialog__btn')) { modalClose(modalStatus, modalDialogStatus, modalStatus); }
   })
});

//================================= Open and Close modal END =================================


//=====================================================
if (navigator.userAgent.search(/Trident/) > 0) {
    $('.modal-ie').style.display = 'flex';
    $('body').classList.add('body-err');
}
//=====================================================


//================================= Валидация =================================

const validInputs = {
  name: false,
  email: false,
  phone: false,
  course: false
};

const inputsName = $$('.input__name'),
      inputsEmail = $$('.input__email'),
      inputsPhone = $$('.input__phone');

const regStr = /[^А-Яа-яЁё\s]/g,
      regNum = /[^0-9\+]/g,
      regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const minLength = 2,
      maxLength = 30;

const errMsg = {
    emptyField: 'Пустое поле!',
    invalidInput: 'Неверный ввод!',
    minLength: `Минимальное количество символов: ${minLength}`,
    maxLength: `Максимальное количество символов: ${maxLength}`
};


const createNewElem = (parent, elem, className, text) => {
    const newElem = document.createElement(elem);
    newElem.classList.add(className);
    newElem.innerHTML = text;
    parent.insertAdjacentElement('beforeend', newElem);
};

const errMsgInputAdd = (elem, errMsg) => {
    elem.classList.add('invalid');

    const elemError = elem.parentNode.querySelector('.error');
    if (!(elemError)) {
        createNewElem(elem.closest('.input-wrap'), 'p', 'error', errMsg);
    }
};

const errMsgInputRemove = (elem) => {
    elem.classList.remove('invalid');

    const elemError = elem.parentNode.querySelector('.error');
    if (elemError) { elemError.remove(); }
};


const checkValidInputName = (inputName) => {
    if (inputName.value !== '') { errMsgInputRemove(inputName); }

    if (inputName.value.trim().length < minLength) {
        errMsgInputAdd(inputName, errMsg.minLength);
        validInputs.name = false;
    }
    else if (inputName.value.trim().length > maxLength) {
        errMsgInputAdd(inputName, errMsg.maxLength);
        validInputs.name = false;
    }
    else {
        errMsgInputRemove(inputName);
        validInputs.name = true;
    }

    let val = inputName.value;
    inputName.value = val.replace(regStr, '');
};

const validInputName = () => {
    inputsName.forEach((inputName) => {
        inputName.addEventListener('input', ()=> { checkValidInputName(inputName); });
    });
};
validInputName();


const checkValidInputEmail = (inputEmail) => {
    if (inputEmail.value !== '') { errMsgInputRemove(inputEmail); }

    if (!regEmail.test(inputEmail.value)) {
        errMsgInputAdd(inputEmail, errMsg.invalidInput);
        validInputs.email = false;

    } else {
        errMsgInputRemove(inputEmail);
        validInputs.email = true;
    }
};

const validInputEmail = ()=> {
    inputsEmail.forEach((inputEmail) => {
        inputEmail.addEventListener('input', ()=> { checkValidInputEmail(inputEmail); });
    });
};
validInputEmail();


const validInputPhone = ()=> {
    inputsPhone.forEach((inputPhone) => {
        inputPhone.addEventListener('input', ()=> {
            if (inputPhone.value !== '') { errMsgInputRemove(inputPhone); }
        });
    });
};
// validInputPhone();


//================================= Отправка данных =================================

const postData = (formBody, form) => {
    fetch('/template/mail.php', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(formBody)
    })
        .then((response) => {
            if (response.status !== 200) { throw new Error('Status network not 200'); }

            modalClose(modal, modalBody, modal);
            modalActive(modalStatus, modalDialogStatus, modalStatus);
            form.reset();
            $('.input__course').value = 'None';

            for (let item in validInputs) { validInputs[item] = false; }

            $('.form__btn').disabled = false;

            return response.text();
        })
        .then((text) => {
            $('.form-result').innerHTML = text;
        })
        .catch((error) => { console.log(error); })
        .finally(() => {
            modalClose(modal, modalBody, modal);
            modalActive(modalStatus, modalDialogStatus, modalStatus);
            form.reset();
            $('.input__course').value = 'None';

            for (let item in validInputs) { validInputs[item] = false; }

            $('.form__btn').disabled = false;
        })
};

//================================= Отправка данных END =================================


//================================= check forms =================================
const forms = $$('form');

const checkFormInput = (input) => {
    const inputName = input.getAttribute('name');

    if (input.value === '') {
        validInputs[inputName] = false;
        errMsgInputAdd(input, errMsg.emptyField);
    } else { validInputs[inputName] = true; }

    if (inputName === 'name') {
        checkValidInputName(input);
    } else if (inputName === 'phone' && input.value !== '') {
        errMsgInputRemove(input);
    } else if (inputName === 'email') {
        checkValidInputEmail(input);
    }
};


const checkForm = () => {
    forms.forEach((form) => {
        form.addEventListener('submit', (e)=> {
            e.preventDefault();

            const inputsForm = $$(`.${form.classList[1]} input`);
            inputsForm.forEach((input) => { checkFormInput(input); });

            const formData = new FormData(form);
            let body = {};
            formData.forEach((val, key) => { body[key] = val; });

            if (validInputs.name && validInputs.email && validInputs.phone && validInputs.course) {
                postData(body, form);
                $('.form__btn').disabled = true;
            }
        })
    });
};
checkForm();

//================================= check forms END =================================


//=================================

const animateScroll = (elem) => {
    const elemId = elem.getAttribute('href'),
          block = $(elemId);

    block.scrollIntoView({block: 'start', behavior: 'smooth'} );
};

const allLinkMenu = $$('.nav-menu__link'),
      descriptionBtn = $('.description__btn');

allLinkMenu.forEach((link) => {
    link.addEventListener('click', (e)=> {
        e.preventDefault();
        animateScroll(link);
    })
});

descriptionBtn.addEventListener('click', (e) => {
   e.preventDefault();
   animateScroll(descriptionBtn);
});

//=================================

const btnUp = $('.btn-up'),
      blockHeader = $('header');

window.addEventListener('scroll', () => {
   if (window.scrollY > 650) { btnUp.style.display = 'block'; }
   else { btnUp.style.display = 'none'; }
});

btnUp.addEventListener('click', ()=> {
    blockHeader.scrollIntoView({block: 'start', behavior: 'smooth'} );
});

//=================================

const accordionTitleAll = $$('.accordion-item__title');

accordionTitleAll.forEach((title) => {
    title.addEventListener('click', ()=> {
        const content = title.parentNode.querySelector('.accordion-item__content');

        if (content.classList.contains('accordion-item--active')) { content.classList.remove('accordion-item--active') }
        else {
            $$('.accordion-item__content').forEach((itemContent) => { itemContent.classList.remove('accordion-item--active') });
            content.classList.add('accordion-item--active');
        }
    });
});

//=================================


//================================= Слайдер =================================

const prevBtn = $('.btn-prev'),
      nextBtn = $('.btn-next'),
      slideContainer = $('.teacher-customers');

const nextSlide = (sliders)=> { slideContainer.insertBefore(sliders[0], null); };
const prevSlide = (sliders)=> { slideContainer.insertAdjacentElement('afterbegin', sliders[sliders.length-1]); };

nextBtn.addEventListener('click', ()=> {
    const allSliders = $$('.teacher-customers__img');
    nextSlide(allSliders);
});

prevBtn.addEventListener('click', ()=> {
    const allSliders = $$('.teacher-customers__img');
    prevSlide(allSliders);
});

//================================= Слайдер END =================================
