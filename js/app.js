'use strict';

let leftImageElement= document.getElementById('left-img');
let middleImageElement= document.getElementById('middle-img');
let rightImageElement= document.getElementById('right-img');

let maxAttempts=25;
let attemptCounter=0;

let leftImageIndex;
let middleImageIndex;
let rightImageIndex;

let namesArray=[];
let votesArray=[];
let shownArray=[];

let threeImagesArray=[];



// constructor

function Product(name, path) {
  this.name=name;
  this.path=path;
  this.shown=0;
  this.votes=0;

  Product.allProducts.push(this);

  namesArray.push(this.name);

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


  while (leftImageIndex===middleImageIndex || leftImageIndex===rightImageIndex || middleImageIndex===rightImageIndex || threeImagesArray.includes(leftImageIndex) || threeImagesArray.includes(middleImageIndex) || threeImagesArray.includes(rightImageIndex)) {
    leftImageIndex=getRandomIndex();
    middleImageIndex=getRandomIndex();
    rightImageIndex=getRandomIndex();
  }
  // console.log(threeImagesArray);
  threeImagesArray=[];

  leftImageElement.src=Product.allProducts[leftImageIndex].path;
  Product.allProducts[leftImageIndex].shown++;
  threeImagesArray.push(leftImageIndex);

  middleImageElement.src=Product.allProducts[middleImageIndex].path;
  Product.allProducts[middleImageIndex].shown++;
  threeImagesArray.push(middleImageIndex);

  rightImageElement.src=Product.allProducts[rightImageIndex].path;
  Product.allProducts[rightImageIndex].shown++;
  threeImagesArray.push(rightImageIndex);

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
    } else if(event.target.id === 'right-img'){
      Product.allProducts[rightImageIndex].votes++;
    }else{
      attemptCounter--;
    }

    renderImages();

  }else{

    for (let i = 0; i < Product.allProducts.length; i++) {
      votesArray.push(Product.allProducts[i].votes);
      shownArray.push(Product.allProducts[i].shown);

    }

    showChart();

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

function showChart() {

  let ctx = document.getElementById('myChart').getContext('2d');

  let chart = new Chart(ctx, {

    type: 'bar',

    data: {
      labels: namesArray,

      datasets: [
        {
          label: 'Product Votes',
          data: votesArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'],

          borderWidth: 1
        },
        {
          label: 'Times Shown',
          data: shownArray,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)'],

          borderWidth: 1
        }
      ]
    },
    options: {}
  });

}




