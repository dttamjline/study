const $ = document.querySelector.bind(document);
console.log(typeof document.querySelector);
console.log($);
const $$ = document.querySelectorAll.bind(document);
const app = {
    songs: [
        {
            name: 'Hazy Moon',
            singer: 'Hatsune Miku',
            path: 'https://free-mp3-download.net/download.php?id=1600064572',
            image: 'https://e-cdns-images.dzcdn.net/images/cover/3246fc8e6dfd21361fdff1bcbe794a7a/500x500-000000-80-0-0.jpg',
        },
        {
            name: 'Best Friend',
            singer: 'Jason Chen',
            path: 'https://free-mp3-download.net/download.php?id=669287582',
            image: 'https://e-cdns-images.dzcdn.net/images/cover/b86f5acc3e17da0b2da165aa6e1c278a/500x500-000000-80-0-0.jpg',
        },
        {
            name: "We Don't Talk Anymore",
            singer: 'Charlie Puth',
            path: 'https://free-mp3-download.net/download.php?id=117797212',
            image: 'https://e-cdns-images.dzcdn.net/images/cover/948200588c813c1afd10f29b56e0ce50/500x500-000000-80-0-0.jpg',
        },
        {
            name: 'Shape of You',
            singer: 'Ed Sheeran',
            path: 'https://free-mp3-download.net/download.php?id=139470659',
            image: 'https://e-cdns-images.dzcdn.net/images/cover/107c2b43f10c249077c1f7618563bb63/500x500-000000-80-0-0.jpg',
        },
        {
            name: 'Step Step',
            singer: 'SURAN',
            path: 'https://free-mp3-download.net/download.php?id=137456560',
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
    //switch theme
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
    //render list song
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

    //include function
    start: function () {
        this.swithTheme();
        this.render();
    },
};
//app start
app.start();
