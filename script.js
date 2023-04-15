const colorPalette = document.getElementById('color-palette');
const buttonRandomColor = document.getElementById('button-random-color');
const pixelBoard = document.getElementById('pixel-board');
const colorDivs = document.querySelectorAll('.color');
const clearButton = document.getElementById('clear-board');

for (let index = 0; index < 25; index += 1) {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel');
  pixelBoard.appendChild(pixel);
}

const selectColor = (event) => {
  colorDivs.forEach((div) => {
    div.classList.remove('selected');
  });
  const colorDiv = event.target;
  colorDiv.classList.add('selected');
  const selectedColors = document.querySelectorAll('.selected');
  if (selectedColors.length > 1) {
    selectedColors.forEach((color) => {
      if (color !== colorDiv) {
        color.classList.remove('selected');
      }
    });
  }
};
const fillPixel = (event) => {
  const pixel = event.target;
  const color = document.querySelector('.selected').style.backgroundColor;
  pixel.style.backgroundColor = color;
};

const pixels = document.querySelectorAll('.pixel');
pixels.forEach((pixel) => {
  pixel.addEventListener('click', fillPixel);
});

const randomColor = () => {
  const genereteColors = '0123456789ABCDEF';
  let color = '#';
  for (let index = 0; index < 6; index += 1) {
    color += genereteColors[Math.floor(Math.random() * 16)];
  }
  return color;
};

const paletteLocalStorage = (colors) => {
  localStorage.setItem('colorPalette', JSON.stringify(colors));
};

const loadPaletteLocalStorage = () => {
  const savedPalette = localStorage.getItem('colorPalette');
  if (savedPalette) {
    return JSON.parse(savedPalette);
  }
  return null;
};

const resetColor = () => {
  let colors = ['#000000'];
  while (colors.length < 4) {
    const newColor = randomColor();
    if (!colors.includes(newColor) && newColor !== '#FFFFFF') {
      colors.push(newColor);
    }
  }

  paletteLocalStorage(colors);
  const colorDivs = document.querySelectorAll('.color');
  colorDivs.forEach((div, index) => {
    div.style.backgroundColor = colors[index];
    div.classList.remove('selected');
    if (index === 0) {
      div.classList.add('selected');
    }
  });
};

colorPalette.innerHTML = '';
for (let index = 0; index < 4; index += 1) {
  const newColor = document.createElement('div');
  newColor.classList.add('color');
  newColor.style.border = '1px solid black';
  colorPalette.appendChild(newColor);
  newColor.addEventListener('click', selectColor);
}

const firstColorDiv = document.querySelector('.color');
firstColorDiv.classList.add('selected');

const savedPalette = loadPaletteLocalStorage();
if (savedPalette) {
  const colorDivs = document.querySelectorAll('.color');
  colorDivs.forEach((div, index) => {
    div.style.backgroundColor = savedPalette[index];
  });
} else {
  resetColor();
}

buttonRandomColor.addEventListener('click', resetColor);

const clearPixels = () => {
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = '#FFFFFF';
  });
};

clearButton.addEventListener('click', clearPixels);
