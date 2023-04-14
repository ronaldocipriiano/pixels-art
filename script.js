const colorPalette = document.getElementById('color-palette');
const buttonRandomColor = document.getElementById('button-random-color');

const randomColor = () => {
  const genereteColors = '0123456789ABCDEF';
  let color = '#';
  for (let index = 0; index < 6; index += 1) {
    color += genereteColors[Math.floor(Math.random() * 16)];
  }
  return color;
};

const resetColor = () => {};
const colors = [];
colors.push('#000000');
while (colors.length < 4) {
  const newColor = randomColor();
  if (!colors.includes(newColor) && newColor !== '#FFFFFF') {
    colors.push(newColor);
  }
}

colorPalette.innerHTML = '';
colors.forEach((color) => {
  const newColor = document.createElement('div');
  newColor.style.backgroundColor = color;
  newColor.classList.add('color');
  newColor.style.border = '1px solid black';
  colorPalette.appendChild(newColor);
});

resetColor();

buttonRandomColor.addEventListener('click', resetColor);
