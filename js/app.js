'use strict';

let leftImageElement= document.getElementById('left-img');
let middleImageElement= document.getElementById('middle-img');
let rightImageElement= document.getElementById('right-img');

let maxAttempts=25;
let attemptCounter=0;

let leftImageIndex;
let middleImageIndex;
let rightImageIndex;


// constructor

function Product(name, path) {
  this.name=name;
  this.path=path;
  this.shown=0;
  this.votes=0;

  Product.allProducts.push(this);

}


Product.allProducts=[];





// instances


new Product('bag','img/bag.jpg');
new Product('banana','img/banana.jpg');
new Product('bathroom','img/bathroom.jpg');
new Product('boots','img/boots.jpg');
new Product('breakfast','img/breakfast.jpg');
new Product('bubblegum','img/bubblegum.jpg');
new Product('chair','img/chair.jpg');
new Product('cthulhu','img/cthulhu.jpg');
new Product('dog-duck','img/dog-duck.jpg');
new Product('dragon','img/dragon.jpg');
new Product('pen','img/pen.jpg');
new Product('pet-sweep','img/pet-sweep.jpg');
new Product('scissors','img/scissors.jpg');
new Product('shark','img/shark.jpg');
new Product('sweep','img/sweep.png');
new Product('tauntaun','img/tauntaun.jpg');
new Product('unicorn','img/unicorn.jpg');
new Product('usb','img/usb.gif');
new Product('water-can','img/water-can.jpg');
new Product('wine-glass','img/wine-glass.jpg');

// console.log(Product.allProducts);


function getRandomIndex() {

  return Math.floor(Math.random() * Product.allProducts.length);

}

function renderImages() {

  leftImageIndex=getRandomIndex();
  middleImageIndex=getRandomIndex();
  rightImageIndex=getRandomIndex();


  while (leftImageIndex===middleImageIndex || leftImageIndex===rightImageIndex || middleImageIndex===rightImageIndex) {
    middleImageIndex=getRandomIndex();
    rightImageIndex=getRandomIndex();
  }

  leftImageElement.src=Product.allProducts[leftImageIndex].path;
  middleImageElement.src=Product.allProducts[middleImageIndex].path;
  rightImageElement.src=Product.allProducts[rightImageIndex].path;

  Product.allProducts[leftImageIndex].shown++;
  Product.allProducts[middleImageIndex].shown++;
  Product.allProducts[rightImageIndex].shown++;
}

renderImages();




let buttonDivElement=document.getElementById('button');
// now the event listener

let buttonElement;

let imgDivElement=document.getElementById('img-div');

imgDivElement.addEventListener('click', performWhenUserClick);

function performWhenUserClick(event) {

  //   console.log(event.target.id);

  attemptCounter++;

  //   console.log(attemptCounter);



  if (attemptCounter <= maxAttempts){

    if (event.target.id === 'left-img') {
      Product.allProducts[leftImageIndex].votes++;
    } else if(event.target.id === 'middle-img'){
      Product.allProducts[middleImageIndex].votes++;
    } else{
      Product.allProducts[rightImageIndex].votes++;
    }

    renderImages();

  }else{

    buttonElement=document.createElement('button');
    buttonDivElement.appendChild(buttonElement);
    buttonElement.innerHTML='View Results';

    imgDivElement.removeEventListener('click', performWhenUserClick);
    buttonElement.addEventListener('click', handleUserClick);
  }

}


function handleUserClick() {

  let list=document.getElementById('results');

  let productResult;

  for (let i=0; i < Product.allProducts.length; i++){
    productResult=document.createElement('li');
    list.appendChild(productResult);

    productResult.textContent=`${Product.allProducts[i].name} had ${Product.allProducts[i].votes} votes, and was seen ${Product.allProducts[i].shown} times`;
  }

  if (productResult) {
    buttonElement.removeEventListener('click', handleUserClick);
  }
}
