console.log('%c HI', 'color: firebrick')


document.addEventListener("DOMContentLoaded", domLoaded, false);


function domLoaded(event){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl).then(function(response){
      return response.json()
    }).then(function(dog){
    addImage(dog.message)
    })
  getBreed()
  createOptions()
}

function addImage(dog){
  for (const dogImage of dog ){
   slapImage(dogImage)
  }
}

function slapImage(dogImage){
   const div = document.getElementById('dog-image-container')
   const imgTag = document.createElement('img')
   imgTag.src = dogImage
   div.append(imgTag)
}


 var breeds = []


function getBreed(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl).then(function(response){
      return response.json();
    }).then(function(breed){
      const breedList = breed.message
      for( const breedItem in breedList ){
        breedList[breedItem]
        if (breedList[breedItem].length == 0 ){
          addBreed(breedItem)
          breeds.push(breedItem)
        }
        else {
          for (let i = 0; i < breedList[breedItem].length; i++ ){
            addBreed(`${breedList[breedItem][i]} ${breedItem}`)
          breeds.push(`${breedList[breedItem][i]} ${breedItem}`)
          }
          addBreed(breedItem)
          breeds.push(breedItem)
        }
      }
    })
  }

  function addBreed(woof){
    const breedTag = document.querySelector('#dog-breeds')
    const breedElement= document.createElement('li')
    breedElement.innerText = woof
    breedTag.append(breedElement)
    breedElement.addEventListener('click', changeColor)
  }

function changeColor(event){
  const listItem = event.target
  listItem.style.color = 'pink'
}

function createOptions(event){
  const letter = 'a'.charCodeAt(0)
  const findOption= document.querySelector("#breed-dropdown")
  for (let i = 0; i < 26; i++){

    const elementOption = document.createElement('option')
    elementOption.value = String.fromCharCode(letter + i)
    elementOption.innerText = String.fromCharCode(letter + i)

  findOption.addEventListener('change', selectLetter)
    findOption.append(elementOption)
  }
}

function selectLetter(event){

  const letterSelect = event.target
  const abcSelect = letterSelect.value
  const filterBreeds = breeds.filter(breed => breed[0] == abcSelect)
console.log(filterBreeds)
   document.querySelector('#dog-breeds').remove()
   const remakeBreeds = document.createElement('ul')
   remakeBreeds.id= 'dog-breeds'
    document.querySelector('body').append(remakeBreeds)
    for (let i = 0; i < filterBreeds.length; i++){
      addBreed(filterBreeds[i])
    }

}
