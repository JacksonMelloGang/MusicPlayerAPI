var title = document.getElementsByName("title")[0];
        var author = document.getElementsByName("author")[0];
        var file = document.getElementsByName("musicfile")[0];

        file.addEventListener("input", function (event) {
          title.value = file.value
            .split("\\")
            [file.value.split("\\").length - 1].substring(0, 35);
        });

      function setmusic(){
        var music = localStorage.getItem('latestmusic') !== undefined ? localStorage.getItem('latestmusic') : undefined;
        var time = localStorage.getItem('audiotime') !== undefined ? localStorage.getItem('audiotime') : undefined;

        if(music == 'null') return;
        document.getElementById('audiosrc').src = music;
        document.getElementById('audiosrc').currentTime = time;
      }

      document.addEventListener('DOMContentLoaded', (e) => {
        aaaa();
      })

      function aaaa() {
       $.ajax({
         url: "http://localhost:3001/song?song=all",
         headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
         method: 'GET',
         success: function(data) {
          console.log(data);
          document.getElementById('list').innerHTML = "";
           var link = "";
           Object.entries(data).forEach(([k, v]) => {
            link += `<li><a class='audio' href='${v.url}'>N°${k} - ${v.name} - ${v.author}</a></li><br>`
           });
            document.getElementById('list').innerHTML += link;
            setaudiosource()
          },
       });
      }

      function setaudiosource(){
        for(let i=0; i < document.getElementsByClassName('audio').length; i++){
          document.getElementsByClassName('audio')[i].addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById('audiosrc').src = document.getElementsByClassName('audio')[i].href;
            document.getElementById('audiosrc').play();
            document.getElementById('audiosrc').volume = 0.5;
            localStorage.setItem('latestmusic', document.getElementsByClassName('audio')[i].href);
          });
        }
      }