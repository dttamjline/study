console.log(this);

const $ = document.querySelector.bind(document);
//console.log(typeof document.querySelector);
console.log($);
const $$ = document.querySelectorAll.bind(document);

const btnOpenModal = $('.btn_crud_add');
const btnCancel = $('.modal_form_btn_cancel');
const btnClose = $('.modal_btn_close');
btnOpenModal.onclick = function () {
    let id = this.dataset.id;
    console.log(id);
    $('#' + id).classList.add('show');
};

btnCancel.onclick = function () {
    $('.modal_add').classList.remove('show');
};
btnClose.onclick = function () {
    $('.modal_add').classList.remove('show');
};
const player = $('.player');
const heading = $('header h2');
const cdThumb = $('.cd_thumb');
const audio = $('#audio');
const btnPlay = $('.btn_toggle_play');
const btnNext = $('.btn_next');
const btnPrev = $('.btn_prev');
const btnRepeat = $('.btnRepeat');
const btnRadom = $('.btn_random');
const progress = $('#progress');
const song = $$('.song');
const playlist = $('.playlist');
const btnEdit = $('.btn_edit_song');

// btnEdit.onclick = function () {
//     let id = this.dataset.id;
//     console.log(id);
//     $('#' + id).classList.add('show');
// };

const cdThumbAni = cdThumb.animate(
    {
        transform: 'rotate(360deg)',
    },
    {
        duration: 15000,
        iterations: Infinity,
    }
);
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs: [
        {
            name: 'Best Friend',
            singer: 'Jason Chen',
            // path: 'mp3/1.mp3',
            path: 'https://cdns-preview-f.dzcdn.net/stream/c-fb3e8cbfcd0dae33831118345e68b800-2.mp3',
            image: 'https://e-cdns-images.dzcdn.net/images/cover/b86f5acc3e17da0b2da165aa6e1c278a/500x500-000000-80-0-0.jpg',
        },
        {
            name: 'Hazy Moon',
            singer: 'Hatsune Miku',
            //path: 'mp3/2.mp3',
            path: 'https://cdns-preview-a.dzcdn.net/stream/c-a5831868fd62ca5b54307fcca7f64448-3.mp3',
            image: 'https://e-cdns-images.dzcdn.net/images/cover/3246fc8e6dfd21361fdff1bcbe794a7a/500x500-000000-80-0-0.jpg',
        },
        {
            name: "We Don't Talk Anymore",
            singer: 'Charlie Puth',
            //path: 'mp3/3.mp3',
            path: 'https://cdns-preview-3.dzcdn.net/stream/c-31ed99bd4e3b2519fee9aa8a12f6826d-6.mp3',
            image: 'https://e-cdns-images.dzcdn.net/images/cover/948200588c813c1afd10f29b56e0ce50/500x500-000000-80-0-0.jpg',
        },
        {
            name: 'Shape of You',
            singer: 'Ed Sheeran',
            //path: 'mp3/4.mp3',
            path: 'https://cdns-preview-d.dzcdn.net/stream/c-d8f5b81a6243ddfa4c97b9a4c86a82fa-6.mp3',
            image: 'https://e-cdns-images.dzcdn.net/images/cover/107c2b43f10c249077c1f7618563bb63/500x500-000000-80-0-0.jpg',
        },
        {
            name: 'Step Step',
            singer: 'SURAN',
            //path: 'mp3/5.mp3',
            path: 'https://cdns-preview-d.dzcdn.net/stream/c-dc3fb2339a13be6ec4dc8d1782996e3d-3.mp3',
            image: 'https://e-cdns-images.dzcdn.net/images/cover/a70128d12ecd8fb89b8b2e969f567af5/500x500-000000-80-0-0.jpg',
        },
    ],
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
        //console.log(app);
    },
    swithTheme: function () {
        const themeItem = $$('.player_theme li');
        themeItem.forEach((element) => {
            let dataColor = element.getAttribute('data-color');
            element.onclick = function () {
                $(':root').style.setProperty('--primary-color', dataColor);
                $('.player_theme li.active').classList.remove('active');
                element.classList.add('active');
                //  $('body').style.setProperty('background',dataColor)
            };
        });
    },
    render: function () {
        //method 1
        // let html = this.songs.map((song, index) => {
        //     return `<div class="song">
        //     <div class="thumb" style="background-image:url(${
        //         song.image ? song.image : 'thumb.jpg'
        //     })"></div>
        //     <div class="body">
        //        <h3 class="title">${song.name}</h3>
        //         <p class="author">${song.singer}</p>
        //     </div>
        //     <div class="option">
        //         <i class="fas fa-ellipsis-h"></i>
        //     </div>
        // </div>`;
        // });
        //console.log(html);
        // $('.playlist').innerHTML = html.join('');

        //method 2 :
        let html = '';
        this.songs.map((song, index) => {
            // console.log(index);
            return (html += `<div class="song ${
                index === this.currentIndex ? 'active' : ''
            }" data-id="${index}">
            <div class="thumb" style="background-image:url(${
                song.image ? song.image : 'thumb.jpg'
            })"></div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-edit btn_edit_song" data-id="modal_edit"></i>
                <i class="fas fa-times btn_remove_song"></i>
            </div>
        </div>`);
        });
        // console.log(html);
        $('.playlist').innerHTML = html;
    },
    handleEvent: function () {
        let _this = this;

        cdThumbAni.pause();
        btnPlay.onclick = function () {
            if (_this.isPlaying) {
                audio.onpause();
            } else {
                audio.onplay();
            }
        };
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            audio.play();
            cdThumbAni.play();
        };
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            audio.pause();
            cdThumbAni.pause();
        };
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                progress.value = progressPercent;
            }
        };
        progress.onchange = function (e) {
            const seekCurrentTime = (e.target.value * audio.duration) / 100;
            audio.currentTime = seekCurrentTime;
        };

        btnNext.onclick = function () {
            if (_this.isRandom) {
                _this.loadRandomSong();
            } else {
                _this.loadNextSong();
            }
            _this.render();
            _this.scrollToActiveSong();
            audio.onplay();
        };
        btnPrev.onclick = function () {
            if (_this.isRandom) {
                _this.loadRandomSong();
            } else {
                _this.loadPrevSong();
            }
            _this.render();
            audio.onplay();
            _this.scrollToActiveSong();
        };
        btnRepeat.onclick = function () {
            this.classList.toggle('active');
            // console.log(this);
            if (this.classList.contains('active')) {
                audio.loop = true;
            } else {
                audio.loop = false;
            }
        };
        btnRadom.onclick = function () {
            this.classList.toggle('active');
            // console.log(this);
            if (this.classList.contains('active')) {
                _this.isRandom = true;
            } else {
                _this.isRandom = false;
            }
        };
        //auto play next song and when play the last song, it will stop playing next song
        audio.onended = function () {
            if (_this.isRandom == true) {
                _this.loadRandomSong();
                audio.onplay();
            } else {
                if (_this.currentIndex >= _this.songs.length - 1) {
                    _this.stopPlaying();
                } else {
                    _this.loadNextSong();
                    audio.onplay();
                }
            }
        };
        playlist.onclick = function (e) {
            const el = e.target.closest('.song');
            let id = el.dataset.id;
            //console.log(id);
            //console.log(_this.currentIndex);
            if (_this.currentIndex !== id || e.target.closest('.option')) {
                if (_this.currentIndex !== id) {
                    $('.song.active').classList.remove('active');
                    el.classList.add('active');
                    _this.currentIndex = id;
                    _this.loadCurrentSong();
                    audio.onplay();
                }
                if (e.target.closest('.option')) {
                    //audio.onpause();
                }
            }
        };
        // window.onload = function () {
        //     audio.onplay();
        // };
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
        this.scrollToActiveSong();
    },

    loadNextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.render();
        this.loadCurrentSong();
    },
    loadPrevSong: function () {
        this.currentIndex--;

        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.render();
        this.loadCurrentSong();
    },
    loadRandomSong: function () {
        let num;
        do {
            num = Math.floor(Math.random() * this.songs.length);
        } while (num === this.currentIndex);
        this.currentIndex = num;
        this.render();
        this.loadCurrentSong();
    },
    stopPlaying: function () {
        this.isPlaying = false;
        player.classList.remove('playing');
        audio.pause();
        cdThumbAni.pause();
    },
    scrollToActiveSong: function () {
        setTimeout(function () {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }, 300);
    },

    start: function () {
        this.defineProperties();
        this.swithTheme();
        this.render();
        this.handleEvent();
        this.loadCurrentSong();
        this.loadNextSong();
        this.loadPrevSong();
        this.stopPlaying();
    },
};

app.start();
