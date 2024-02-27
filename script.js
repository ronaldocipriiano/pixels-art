const createColorPalette = (colors) => {
  const colorPalette = document.querySelector('#color-palette');

  for (let index = 0; index < colors.length; index += 1) {
    const colorDiv = document.createElement('div');
    colorDiv.className = 'color';
    if (index === 0) {
      colorDiv.classList.add('selected');
    }
    colorDiv.style.backgroundColor = colors[index];
    colorPalette.appendChild(colorDiv);
  }
};

const savePalette = () => {
  const colorDivs = document.querySelectorAll('.color');
  const colors = [];
  for (let index = 0; index < colorDivs.length; index += 1) {
    const color = colorDivs[index].style.backgroundColor;
    colors.push(color);
  }
  localStorage.setItem('colorPalette', JSON.stringify(colors));
};

const generateColor = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.round(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
};

const generateRandomColors = () => {
  const buttonRandomColor = document.querySelector('#button-random-color');
  buttonRandomColor.addEventListener('click', () => {
    const divsDeColor = document.querySelectorAll('.color');
    for (let index = 1; index < divsDeColor.length; index += 1) {
      divsDeColor[index].style.backgroundColor = generateColor();
    }
    savePalette();
  });
};

const loadPalette = () => {
  const colorsJSON = localStorage.getItem('colorPalette');
  if (!colorsJSON) return ['#000', '#bd93f9', '#50fa7b', '#ff79c6'];
  return JSON.parse(colorsJSON);
};

const createPixelsBoard = (colors, boardSize) => {
  const pixelBoard = document.querySelector('#pixel-board');
  let adjustedBoardSize = boardSize;
  if (adjustedBoardSize < 5) adjustedBoardSize = 5;
  if (adjustedBoardSize > 50) adjustedBoardSize = 50;

  pixelBoard.innerHTML = '';
  pixelBoard.style.gridTemplateColumns = `repeat(${adjustedBoardSize}, 40px)`;

  for (let index = 0; index < (adjustedBoardSize * adjustedBoardSize); index += 1) {
    const pixel = document.createElement('div');
    pixel.id = index;
    pixel.classList.add('pixel');
    pixel.style.backgroundColor = colors ? colors[index] : 'white';

    pixelBoard.appendChild(pixel);
  }
};

const selectColor = () => {
  const colorDivs = document.querySelectorAll('.color');
  colorDivs.forEach((colorDiv) => {
    colorDiv.addEventListener('click', (event) => {
      const selectedColor = document.querySelector('.selected');
      if (selectedColor.classList.contains('selected')) selectedColor.classList.remove('selected');
      event.target.classList.add('selected');
    });
  });
};

const saveBoard = () => {
  const pixels = document.querySelectorAll('.pixel');
  const pixelColors = [];

  pixels.forEach((pixel) => {
    const pixelColor = pixel.style.backgroundColor;
    if (!pixelColor) {
      pixelColors.push('white');
      return;
    }
    pixelColors.push(pixelColor);
  });
  localStorage.setItem('pixelBoard', JSON.stringify(pixelColors));
};

const deleteBoard = () => {
  localStorage.removeItem('pixelBoard');
};

const fillPixels = () => {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixelDiv) => {
    pixelDiv.addEventListener('click', ({ target }) => {
      const pixel = target;
      const selectedColor = document.querySelector('.selected');
      if (!selectedColor) return;
      pixel.style.backgroundColor = selectedColor.style.backgroundColor;
      saveBoard();
    });
  });
};

const clearBoard = () => {
  const clearButton = document.querySelector('#clear-board');
  clearButton.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => {
      const pixelDiv = pixel;
      pixelDiv.style.backgroundColor = 'white';
    });
    saveBoard();
  });
};

const loadBoard = () => {
  const pixels = JSON.parse(localStorage.getItem('pixelBoard'));
  if (!pixels) return;

  return pixels;
};

const savedBoardSize = (newSize) => {
  localStorage.setItem('boardSize', newSize);
};

const loadBoardSize = () => {
  const savedSize = JSON.parse(localStorage.getItem('boardSize'));
  if (!savedSize) return 5;
  return savedSize;
};

const generateBoard = () => {
  const generateBoardButton = document.querySelector('#generate-board');
  generateBoardButton.addEventListener('click', (event) => {
    event.preventDefault();

    const boardSizeInput = document.querySelector('#board-size');

    if (boardSizeInput.value === '') {
      alert('Board inválido!');
      return;
    }
    deleteBoard();
    createPixelsBoard(loadBoard(), parseInt(boardSizeInput.value, 10));
    fillPixels();
    saveBoard();
    savedBoardSize(parseInt(boardSizeInput.value, 10));
  });
};

window.onload = () => {
  createColorPalette(loadPalette());
  generateRandomColors();
  createPixelsBoard(loadBoard(), loadBoardSize());
  selectColor();
  fillPixels();
  clearBoard();
  generateBoard();
};
