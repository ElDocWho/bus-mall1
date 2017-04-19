'use strict';

var imageArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var nameArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var productArray = [];
var img1 = document.getElementById('left');
var img2 = document.getElementById('center');
var img3 = document.getElementById('right');
var totalClicks = 0;

function Products(itemName, itemPath) {
  this.itemName = itemName;
  this.itemPath = itemPath;
  this.itemClick = 0;
  this.imageShown = 0;
  productArray.push(this);
};

for (var i = 0; i < imageArray.length; i++) {
  var filePath = 'img/' + imageArray[i];
  new Products(nameArray[i], filePath);
}

function randomImgIndex(){
  return Math.floor(Math.random() * imageArray.length);
};

var prevImgIndexes = [];
function randomImage(){
  var currentImgIndexes = [];
  while (currentImgIndexes.length < 3) {
    var imgSelector = randomImgIndex();
    if (!currentImgIndexes.includes(imgSelector) && !prevImgIndexes.includes(imgSelector)) {
      currentImgIndexes.push(imgSelector);
    }
  }
  var prod1 = productArray[currentImgIndexes[0]];
  var prod2 = productArray[currentImgIndexes[1]];
  var prod3 = productArray[currentImgIndexes[2]];
  img1.src = prod1.itemPath;
  img2.src = prod2.itemPath;
  img3.src = prod3.itemPath;
  img1.alt = currentImgIndexes[0];
  img2.alt = currentImgIndexes[1];
  img3.alt = currentImgIndexes[2];
  prevImgIndexes = currentImgIndexes;
  prod1.imageShown++;
  prod2.imageShown++;
  prod3.imageShown++;
};
randomImage();

var clickLimit = 25;
function handleTheClick(){
  randomImage();
  totalClicks++;
  var productIdx = this.alt;
  productArray[productIdx].itemClick++;

  if (totalClicks === clickLimit) {
    img1.removeEventListener('click', handleTheClick);
    img2.removeEventListener('click', handleTheClick);
    img3.removeEventListener('click', handleTheClick);
    productClicks();
  }
};

img1.addEventListener('click', handleTheClick);
img2.addEventListener('click', handleTheClick);
img3.addEventListener('click', handleTheClick);

function productClicks(){
  var content = document.getElementById('content');
  var ul = document.createElement('ul');
  content.appendChild(ul);
  for (var i = 0; i < productArray.length; i++) {
    var li = document.createElement('li');
    var dataStr = productArray[i].itemClick + ' clicks for ' + productArray[i].itemName;
    li.innerText = dataStr;
    ul.appendChild(li);
  }
}
