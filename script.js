const colorPalette = document.getElementById('color-palette');
const buttonRandomColor = document.getElementById('button-random-color');
const pixelBoard = document.getElementById('pixel-board');

for (let index = 0; index < 25; index += 1) {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel');
  pixelBoard.appendChild(pixel);
}

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
  let colors = ['#000000', randomColor(), randomColor(), randomColor()];
  while (new Set(colors).size < 4) {
    colors = ['#000000', randomColor(), randomColor(), randomColor()];
  }
  paletteLocalStorage(colors);
  const colorDivs = document.querySelectorAll('.color');
  colorDivs.forEach((div, index) => {
    div.style.backgroundColor = colors[index];
  });
};

colorPalette.innerHTML = '';
for (let index = 0; index < 4; index += 1) {
  const newColor = document.createElement('div');
  newColor.classList.add('color');
  newColor.style.border = '1px solid black';
  colorPalette.appendChild(newColor);
}

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
