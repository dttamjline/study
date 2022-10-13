const btnSuccess = document.querySelector('.btn__success');
const btnError = document.querySelector('.btn__error');
const btnInfo = document.querySelector('.btn__info');

function toast({ title = '', mess = '', type = 'info', duration = 3000 }) {
    const main = document.getElementById('toast');

    if (main) {
        const toast = document.createElement('div');
        const icons = {
            success: 'fa-circle-check',
            error: 'fa-sharp fa-circle-xmark',
            info: 'fa-circle-exclamation',
        };
        const icon = icons[type];
        toast.classList.add('toast', `toast--${type}`);
        const delay = (duration / 1000).toFixed(2);
        toast.style.animation = `showMess ease 1s, fadeOut 1s ${delay}s forwards`;
        const timeOut = setTimeout(() => {
            main.removeChild(toast);
        }, 6000);

        toast.onclick = function (e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(timeOut);
            }
        };

        toast.innerHTML = `
            <div class="toast__icon">
                <i class="fa-solid ${icon}"></i>
            </div>
            <div class="toast__body">
                <p class="toast__ttl">${title}</p>
                <p class="toast__desc">${mess}</p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}

btnSuccess.onclick = function () {
    toast({
        title: 'Bạn đã đăng nhập thành công',
        mess: 'Chào mừng bạn đến với website Tâm',
        type: 'success',
        duration: 5000,
    });
};
btnError.onclick = function () {
    toast({
        title: 'Đăng nhập thất bại',
        mess: 'Tên đăng nhập hoặc mật khẩu không đúng',
        type: 'error',
        duration: 5000,
    });
};
btnInfo.onclick = function () {
    toast({
        title: 'Đăng nhập thất bại',
        mess: 'Lỗi hệ thống',
        type: 'info',
        duration: 5000,
    });
};
