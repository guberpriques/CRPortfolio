const lightbox = document.createElement('div')
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)

const lightboxImage = document.createElement('img')
lightbox.appendChild(lightboxImage)

const lightboxVideo = document.createElement('iframe')
lightboxVideo.style.display = 'none'
lightbox.appendChild(lightboxVideo)

// Create a new iframe for Google Slides
const lightboxSlides = document.createElement('iframe')
lightboxSlides.style.display = 'none'
lightbox.appendChild(lightboxSlides)

const lightboxCaption = document.createElement('p')
lightboxCaption.style.color = 'white'
lightbox.appendChild(lightboxCaption)

let currentImageIndex = null

lightbox.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return
  lightbox.classList.remove('active')
  lightboxVideo.src = ''  
  lightboxSlides.src = ''  
  lightboxImage.src = '' 
  lightboxImage.style.display = 'block'  
  lightboxVideo.style.display = 'none'
  lightboxSlides.style.display = 'none'
})

const images = document.querySelectorAll('.box img')
images.forEach((image, index) => { 
  image.addEventListener('click', e => {
    lightbox.classList.add('active')
    lightboxCaption.textContent = image.alt
    currentImageIndex = index  
    
    const youtubeId = image.dataset.youtube
    const slideId = image.dataset.slide
    if (youtubeId) {
      lightboxImage.style.display = 'none'
      lightboxVideo.src = `https://www.youtube.com/embed/${youtubeId}`
      lightboxVideo.style.display = 'block'
    } else if (slideId) {
      lightboxImage.style.display = 'none'
      lightboxSlides.src = slideId
      lightboxSlides.style.display = 'block'
    } else {
      lightboxImage.style.display = 'block'
      lightboxImage.src = image.src  
      lightboxVideo.style.display = 'none'
      lightboxSlides.style.display = 'none'
    }
  })
})

// Previous and next button creation
const prevButton = document.createElement('button')
prevButton.textContent = 'Prev'
prevButton.style.position = 'absolute'
prevButton.style.left = '10px'
prevButton.style.fontSize = '1.5em' // Increase button text size
lightbox.appendChild(prevButton)

const nextButton = document.createElement('button')
nextButton.textContent = 'Next'
nextButton.style.position = 'absolute'
nextButton.style.right = '10px'
nextButton.style.fontSize = '1.5em' // Increase button text size
lightbox.appendChild(nextButton)

function showPrevImage(e) {
  e.stopPropagation() 
  currentImageIndex--
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1
  }
  const image = images[currentImageIndex]
  lightboxImage.src = image.src
  lightboxCaption.textContent = image.alt
  updateLightbox(image)
}

function showNextImage(e) {
  e.stopPropagation()
  currentImageIndex++
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0
  }
  const image = images[currentImageIndex]
  lightboxImage.src = image.src
  lightboxCaption.textContent = image.alt
  updateLightbox(image)
}

// Update lightbox depending on the content (image, youtube, slide)
function updateLightbox(image) {
  const youtubeId = image.dataset.youtube
  const slideId = image.dataset.slide
  if (youtubeId) {
    lightboxImage.style.display = 'none'
    lightboxVideo.src = `https://www.youtube.com/embed/${youtubeId}`
    lightboxVideo.style.display = 'block'
    lightboxSlides.style.display = 'none'
  } else if (slideId) {
    lightboxImage.style.display = 'none'
    lightboxVideo.style.display = 'none'
    lightboxSlides.src = slideId
    lightboxSlides.style.display = 'block'
  } else {
    lightboxImage.style.display = 'block'
    lightboxVideo.style.display = 'none'
    lightboxSlides.style.display = 'none'
  }
}

prevButton.addEventListener('click', showPrevImage)
nextButton.addEventListener('click', showNextImage)

document.addEventListener('keydown', e => {
  if (lightbox.classList.contains('active')) {
    switch (e.key) {
      case 'ArrowLeft':
        showPrevImage(e)
        break
      case 'ArrowRight':
        showNextImage(e)
        break
      case 'Escape': // close lightbox on 'Esc' key
        lightbox.classList.remove('active')
        lightboxVideo.src = ''
        lightboxSlides.src = ''
        lightboxImage.src = ''
        break
    }
  }
})

