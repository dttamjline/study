const $ = document.querySelector.bind(document);
console.log(typeof document.querySelector);
console.log($);
const $$ = document.querySelectorAll.bind(document);
const player = $('.player');
const heading = $('header h2');
const cdThumb = $('.cd_thumb');
const audio = $('#audio');
const btnPlay = $('.btn_toggle-play');
const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name: 'Best Friend',
            singer: 'Jason Chen',
            path: 'https://cdns-preview-f.dzcdn.net/stream/c-fb3e8cbfcd0dae33831118345e68b800-2.mp3',
            image: 'https://e-cdns-images.dzcdn.net/images/cover/b86f5acc3e17da0b2da165aa6e1c278a/500x500-000000-80-0-0.jpg',
        },
        {
            name: 'Hazy Moon',
            singer: 'Hatsune Miku',
            path: 'https://cdns-preview-a.dzcdn.net/stream/c-a5831868fd62ca5b54307fcca7f64448-3.mp3',
            image: 'https://e-cdns-images.dzcdn.net/images/cover/3246fc8e6dfd21361fdff1bcbe794a7a/500x500-000000-80-0-0.jpg',
        },
        {
            name: "We Don't Talk Anymore",
            singer: 'Charlie Puth',
            path: 'https://cdns-preview-3.dzcdn.net/stream/c-31ed99bd4e3b2519fee9aa8a12f6826d-6.mp3',
            image: 'https://e-cdns-images.dzcdn.net/images/cover/948200588c813c1afd10f29b56e0ce50/500x500-000000-80-0-0.jpg',
        },
        {
            name: 'Shape of You',
            singer: 'Ed Sheeran',
            path: 'https://cdns-preview-d.dzcdn.net/stream/c-d8f5b81a6243ddfa4c97b9a4c86a82fa-6.mp3',
            image: 'https://e-cdns-images.dzcdn.net/images/cover/107c2b43f10c249077c1f7618563bb63/500x500-000000-80-0-0.jpg',
        },
        {
            name: 'Step Step',
            singer: 'SURAN',
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
            return (html += `<div class="song">
            <div class="thumb" style="background-image:url(${
                song.image ? song.image : 'thumb.jpg'
            })"></div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>`);
        });
        console.log(html);
        $('.playlist').innerHTML = html;
    },
    handleEvent: function () {
        let _this = this;
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
        };
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            audio.pause();
        };
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = this.currentSong.image;
        audio.src = this.currentSong.path;

        let audioFirst = document.getElementById('audio');
        console.log(audioFirst);
        //this.isPlaying = true;
        //player.classList.add('playing');
        audioFirst.play();
        // audio.get(0).play();
        // console.log(audio.get(0));
        // this.songs[0].play();

        //console.log(this.currentSong);
    },
    start: function () {
        this.defineProperties();
        this.swithTheme();
        this.render();
        this.handleEvent();
        this.loadCurrentSong();
    },
};

app.start();
