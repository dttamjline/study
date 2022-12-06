//console.log(this);

const $ = document.querySelector.bind(document);
//console.log(typeof document.querySelector);
// console.log($);
const $$ = document.querySelectorAll.bind(document);

const btnOpenAddSong = $('.btn_open_add_song');
const btnOpenEditSong = $('.btn_open_edit_song');
const btnOpenDelSong = $('.btn_open_del_song');
const btnCancel = $('.modal_form_btn_cancel');
const btnClose = $('.modal_btn_close');
const player = $('.player');
const heading = $('header h2');
const cdThumb = $('.cd_thumb');
const song_name = $('.song_name');
const song_singer = $('.song_singer');
const song_mp3 = $('.song_mp3');
const song_thumb = $('.song_thumb');

const audio = $('#audio');
const btnPlay = $('.btn_toggle_play');
const btnNext = $('.btn_next');
const btnPrev = $('.btn_prev');
const btnRepeat = $('.btnRepeat');
const btnRadom = $('.btn_random');
const progress = $('#progress');
const playlist = $('.playlist');
const modalFormButton = $('.modal_form_btn');
const modalFormDel = $('.modal_form_del');
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
                <i class="fas fa-edit btn_open_edit_song" data-id="${index}"></i>
                <i class="fas fa-times btn_open_del_song" data-id="${index}"></i>
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
            //console.log(e.target);
            //console.log(e.target.classList.contains('btn_open_edit_song'));

            const songNode = e.target.closest('.song:not(.active)');
            let idSong = e.target.closest('.song').dataset.id;
            const currentSong = _this.songs[idSong];
            // Handle when clicking on the song
            if (
                songNode &&
                !e.target.closest('.btn_open_edit_song') &&
                !e.target.closest('.btn_open_del_song')
            ) {
                _this.currentIndex = Number(songNode.dataset.id);
                _this.loadCurrentSong();
                _this.render();
                audio.play();
            }

            if (e.target.closest('.btn_open_edit_song')) {
                console.log(e.target.closest('.btn_open_edit_song'));

                $('.modal').classList.add('show');
                $('.modal').classList.add('modal_update');
                $('.modal').classList.remove('modal_add');
                $('.modal').classList.remove('modal_del');
                $('.modal').setAttribute('data-id', idSong);
                $('.modal_ttl').innerHTML = 'Update Song';
                $('.modal_form_btn').innerHTML = 'Update Song';
                $('.song_name').value = currentSong.name;
                $('.song_singer').value = currentSong.singer;
                $('.song_mp3').value = currentSong.path;
                $('.song_thumb').value = currentSong.image;
            }
            if (e.target.closest('.btn_open_del_song')) {
                $('.modal').classList.add('show');
                $('.modal').classList.add('modal_del');
                $('.modal').classList.remove('modal_add');
                $('.modal').classList.remove('modal_update');
                $('.modal').setAttribute('data-id', idSong);
                $('.modal_ttl').innerHTML = 'Delete Song';
                $('.modal_form_btn').innerHTML = 'Delete Song';
            }
        };

        btnOpenAddSong.onclick = function () {
            $('.modal').classList.add('show');
            $('.modal').classList.add('modal_add');
            $('.modal').classList.remove('modal_update');
            $('.modal').classList.remove('modal_del');
            $('.modal_ttl').innerHTML = 'Add New Song';
            $('.modal_form_btn').innerHTML = 'Add Song';
            $('.song_name').value = '';
            $('.song_singer').value = '';
            $('.song_mp3').value = '';
            $('.song_thumb').value = '';
        };

        btnCancel.onclick = function () {
            $('.modal').classList.remove('show');
            $('.modal').removeAttribute('data-id');
            if ($('.modal').classList.contains('modal_add')) {
                $('.modal').classList.remove('modal_update');
                $('.modal').classList.remove('modal_del');
            } else if ($('.modal').classList.contains('modal_update')) {
                $('.modal').classList.remove('modal_add');
                $('.modal').classList.remove('modal_del');
            } else if ($('.modal').classList.contains('modal_del')) {
                $('.modal').classList.remove('modal_add');
                $('.modal').classList.remove('modal_update');
            }
        };
        btnClose.onclick = function () {
            $('.modal').classList.remove('show');
            $('.modal').removeAttribute('data-id');
            $('.modal').removeAttribute('data-id');
            if ($('.modal').classList.contains('modal_add')) {
                $('.modal').classList.remove('modal_update');
                $('.modal').classList.remove('modal_del');
            } else if ($('.modal').classList.contains('modal_update')) {
                $('.modal').classList.remove('modal_add');
                $('.modal').classList.remove('modal_del');
            } else if ($('.modal').classList.contains('modal_del')) {
                $('.modal').classList.remove('modal_add');
                $('.modal').classList.remove('modal_update');
            }
        };
        modalFormButton.onclick = function () {
            if ($('.modal').classList.contains('modal_add')) {
                const obj = {
                    name: song_name.value,
                    singer: song_singer.value,
                    path: song_mp3.value,
                    image: song_thumb.value,
                };
                _this.songs.push(obj);
            } else if ($('.modal').classList.contains('modal_update')) {
                let idSong = $('.modal_update').dataset.id;
                const currentSong = _this.songs[idSong];
                currentSong.name = $('.song_name').value;
                currentSong.singer = $('.song_singer').value;
                currentSong.path = $('.song_mp3').value;
                currentSong.image = $('.song_thumb').value;
            } else if ($('.modal').classList.contains('modal_del')) {
                let idSong = $('.modal_del').dataset.id;
                if (idSong > -1) {
                    _this.songs.splice(idSong, 1);
                }
            }
            _this.render();
            $('.modal').classList.remove('show');
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
    validator: function () {
        let name = $('.song_name').value;
        let singer = $('.song_singer').value;
        let path = $('.song_mp3').value;
        let image = $('.song_thumb').value;
        console.log($$('.modal_form_input'));
        const obj = $$('.modal_form_input');
        console.log(Object.values(obj));
        let arr = Object.values(obj);
        arr.forEach(function (item, index) {
            item.oninput = function () {
                $('.error').innerHTML = '';
            };
        });
    },
    start: function () {
        this.validator();
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
