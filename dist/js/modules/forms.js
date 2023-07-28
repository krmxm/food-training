import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalSelector, modalDilogSelector, modalTimerId) {
        // Forms

        const form = document.querySelectorAll(formSelector);

        const message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };
    
        form.forEach(item => {
            bindPostData(item, `${modalSelector}`);
        });
    
        function bindPostData(form, modalSelector) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
    
                const statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                form.insertAdjacentElement('afterend', statusMessage);
    
                
    
                const formData = new FormData(form);
    
                // const object = {};
                // formData.forEach(function(value, key) {
                //     object[key] = value;
                // });
    
                const json = JSON.stringify(Object.fromEntries(formData.entries())); // элегантный способ
    
                postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success, modalSelector, modalDilogSelector);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure, modalSelector, modalDilogSelector);
                }).finally(() => {
                    form.reset();
                });
    
            });
        }
    
        function showThanksModal(message, modalSelector, modalDilogSelector) {
            const prevModalDialog = document.querySelector(modalDilogSelector);
    
            prevModalDialog.classList.add('hide');
            prevModalDialog.classList.remove('show');
            openModal(modalSelector, modalTimerId); // ???
    
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div data-close class="modal__close">×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
    
            document.querySelector(modalSelector).append(thanksModal);
    
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal(modalSelector);
            }, 4000);
        }
}

export default forms;