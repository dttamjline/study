const btnSuccess = document.getElementsByClassName('.btn__success');
const btnError = document.getElementsByClassName('.btn__error');
const btnInfo = document.getElementsByClassName('.btn__info');

function toast({ title = '', mess = '', type = 'info', duration = 3000 }) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerHTML = `
        <div class="toast__icon">
            <i class="fa-solid fa-circle-check"></i>
        </div>
        <div class="toast__body">
            <p class="toast__ttl">Bạn đã đăng nhập thành công</p>
            <p class="toast__desc">Chào mừng bạn đến với website Tâm</p>
        </div>
        <div class="toast__close">
            <i class="fa-solid fa-xmark"></i>
        </div>
        `;
        main.appendChild(toast);
    }
}
toast({
    title: 'success',
    mess: 'Bạn đã đăng nhập thành công',
    type: 'success',
    duration: 3000,
});

btnSuccess = onclick(function () {});
btnError = onclick(function () {});
btnInfo = onclick(function () {});
