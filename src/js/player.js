const SGF_PLAYER = (() => {
  const elem = document.getElementById('player');
  const redraw = () => {
    const idealWidth = Math.min(window.innerHeight, window.innerWidth) - 220;
    elem.style.width = idealWidth.toString() + 'px';
  }
  window.addEventListener('resize', redraw) || redraw();

  document.addEventListener('swiped-left', (e) => {
    document.getElementsByClassName('wgo-button-next')[0].click();
  });

  document.addEventListener('swiped-right', (e) => {
    document.getElementsByClassName('wgo-button-previous')[0].click();
  });

  const getGame = () => {
    const gameElem = document.getElementById('game_link');

    gameElem.onclick = () => {
      window.location = `#${gameElem.dataset.id}:${SGF_PLAYER.kifuReader.path.m}`;
    }

    if (window.location.hash != '') {
      gameElem.dataset.id = window.location.hash.replace('#', '').split(':')[0];
      if (SGF_GAMES.has(gameElem.dataset.id)) return SGF_GAMES.get(gameElem.dataset.id);
    }

    gameElem.dataset.id = SGF_GAMES_KEYS[Math.floor(Math.random() * SGF_GAMES_KEYS.length)];
    return SGF_GAMES.get(gameElem.dataset.id);
  }

  const getStartingMove = () => {
    if (window.location.hash != '') {
      const gameIdStr = window.location.hash.split(':');
      if (gameIdStr.length > 1) {
        return parseInt(gameIdStr[1]);
      }
    }

    return Math.floor(Math.random()*50);
  }

  const gameInfo = (name, data) => {
    if (data == null) return '';
    return `<p class="event_info"><b>${name}</b>: ${data}</p>`;
  };

  const convertDate = (date) => {
    if (date == null) return null;

    const datum = new Date(date.split(',')[0].split('.')[0]);
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];

    return `${months[datum.getMonth()]} ${datum.getDate()},  ${datum.getFullYear()}`;
  }

  const player = new WGo.BasicPlayer(elem, {
    sgfFile: getGame(),
    move: getStartingMove(),
    layout: {
      bottom: ['Control']
    },
    kifuLoaded: (e) => {
      const blackElem = document.getElementById('black_player');
      const whiteElem = document.getElementById('white_player');
      const infoElem = document.getElementById('event_info');

      const blackName = player.kifu.info.black.name;
      const blackRank = player.kifu.info.black.rank || '';
      const whiteName = player.kifu.info.white.name;
      const whiteRank = player.kifu.info.white.rank || '';

      const event = gameInfo('Event', player.kifu.info.EV);
      const round = gameInfo('Round', player.kifu.info.RO);
      const komi = gameInfo('Komi', player.kifu.info.KM);
      const result = gameInfo('Result', player.kifu.info.RE);
      const date = gameInfo('Date', convertDate(player.kifu.info.DT));

      blackElem.innerHTML = `${blackName} ${blackRank}`;
      whiteElem.innerHTML = `${whiteName} ${whiteRank}`;
      infoElem.innerHTML = `${event} ${round} ${date} ${komi} ${result}`
    },
    board: {
      background: '#f2be5c'
    }
  });

  document.getElementsByClassName('wgo-button-about')[0].style = 'display: none';
  document.getElementsByClassName('wgo-button-menu')[0].style = 'display: none';

  return player;
})();
