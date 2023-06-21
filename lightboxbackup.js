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

// rest of your code...


let currentImageIndex = null  // add a variable to keep track of the current image index

lightbox.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return
  lightbox.classList.remove('active')
  lightboxVideo.src = ''  // clear the YouTube video source
  lightboxSlides.src = ''  // clear the Google Slides source
  lightboxImage.src = ''  // clear the image source
  lightboxImage.style.display = 'block'  // make the image visible
  lightboxVideo.style.display = 'none'  // hide the YouTube video
  lightboxSlides.style.display = 'none'  // hide the Google Slides
})


const images = document.querySelectorAll('.box img')
images.forEach((image, index) => {  // add an index parameter to the forEach callback
  image.addEventListener('click', e => {
    lightbox.classList.add('active')
    lightboxCaption.textContent = image.alt
    currentImageIndex = index  // save the current index
    
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
      lightboxImage.src = image.src  // only set the image source if no YouTube video or Google Slides presentation
      lightboxVideo.style.display = 'none'
      lightboxSlides.style.display = 'none'
    }
  })
})

// Your previous code...

// This function is for the previous image
function showPrevImage(e) {
  e.stopPropagation()  // prevent the lightbox from closing
  currentImageIndex--
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1
  }
  const image = images[currentImageIndex]
  
  const youtubeId = image.dataset.youtube
  const slideId = image.dataset.slide
  if (youtubeId) {
    // Your previous code...
  } else if (slideId) {
    // Your previous code...
  } else {
    lightboxImage.style.display = 'block'
    lightboxImage.src = image.src  // only set the image source if no YouTube video or Google Slides presentation
    lightboxVideo.style.display = 'none'
    lightboxSlides.style.display = 'none'
  }
}

// This function is for the next image
function showNextImage(e) {
  e.stopPropagation()
  currentImageIndex++
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0
  }
  const image = images[currentImageIndex]
  
  const youtubeId = image.dataset.youtube
  const slideId = image.dataset.slide
  if (youtubeId) {
    // Your previous code...
  } else if (slideId) {
    // Your previous code...
  } else {
    lightboxImage.style.display = 'block'
    lightboxImage.src = image.src  // only set the image source if no YouTube video or Google Slides presentation
    lightboxVideo.style.display = 'none'
    lightboxSlides.style.display = 'none'
  }
}

prevButton.addEventListener('click', showPrevImage)

nextButton.addEventListener('click', showNextImage)

// Listen for keyboard events
document.addEventListener('keydown', e => {
  if (lightbox.classList.contains('active')) {  // only navigate when the lightbox is open
    if (e.key === 'ArrowLeft') {  // previous image on left arrow key
      showPrevImage(e)
    } else if (e.key === 'ArrowRight') {  // next image on right arrow key
      showNextImage(e)
    }
  }
})

// Your previous code...

  




const prevButton = document.createElement('button')
prevButton.textContent = 'Previous'
prevButton.style.position = 'absolute'
prevButton.style.left = '10px'
prevButton.addEventListener('click', e => {
  e.stopPropagation()  // prevent the lightbox from closing
  currentImageIndex--
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1
  }
  const image = images[currentImageIndex]
  lightboxImage.src = image.src
  lightboxCaption.textContent = image.alt

  const youtubeId = image.dataset.youtube
  const slideId = image.dataset.slide
  if (youtubeId) {
    // Your previous code...
  } else if (slideId) {
    // Your previous code...
  } else {
    lightboxImage.style.display = 'block'
    lightboxImage.src = image.src  // only set the image source if no YouTube video or Google Slides presentation
    lightboxVideo.style.display = 'none'
    lightboxSlides.style.display = 'none'
  }
})

lightbox.appendChild(prevButton)

const nextButton = document.createElement('button')
nextButton.textContent = 'Next'
nextButton.style.position = 'absolute'
nextButton.style.right = '10px'
nextButton.addEventListener('click', e => {
  e.stopPropagation()
  currentImageIndex++
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0
  }
  const image = images[currentImageIndex]
  lightboxImage.src = image.src
  lightboxCaption.textContent = image.alt

  const youtubeId = image.dataset.youtube
  const slideId = image.dataset.slide
  if (youtubeId) {
    // Your previous code...
  } else if (slideId) {
    // Your previous code...
  } else {
    lightboxImage.style.display = 'block'
    lightboxImage.src = image.src  // only set the image source if no YouTube video or Google Slides presentation
    lightboxVideo.style.display = 'none'
    lightboxSlides.style.display = 'none'
  }
})
lightbox.appendChild(nextButton)