const cols = document.querySelectorAll('.col')
const colTitles = document.querySelectorAll('.col-title')
const copyTippys = document.querySelectorAll('.copyTippy')
const textCopied = document.querySelectorAll('.text-copied')
const newColors = document.querySelector('.newColors')

document.addEventListener('keydown', (event) => {
   event.preventDefault()
   if (event.code.toLowerCase() === 'space') {
      setRandomColors()
   }
})

newColors.addEventListener('click', (e) => setRandomColors())

colTitles.forEach((colTitle) =>
   colTitle.addEventListener('mouseover', (e) => {
      colTitle.nextElementSibling.classList.add('hover')
   })
)
colTitles.forEach((colTitle) =>
   colTitle.addEventListener('mouseout', (e) => {
      colTitle.nextElementSibling.classList.remove('hover')
   })
)
colTitles.forEach((colTitle) =>
   colTitle.addEventListener('click', (e) => {
      colTitle.parentElement.nextElementSibling.classList.add('click')
      setTimeout(() => colTitle.parentElement.nextElementSibling.classList.remove('click'), 1000)
   })
)

document.addEventListener('click', (event) => {
   const type = event.target.dataset.type

   if (type === 'lock') {
      const node =
         event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0]

      node.classList.toggle('fa-lock-open')
      node.classList.toggle('fa-lock')
   } else if (type === 'copy') {
      copyToClickboard(event.target.textContent)
   }
})

function gerenerateRandomColor() {
   // RGB
   // #FF0000
   // #00FF00
   // #0000FF

   const hexCodes = '0123456789ABCDEF'
   let color = ''
   for (let i = 0; i < 6; i++) {
      color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
   }
   return '#' + color
}

function copyToClickboard(text) {
   return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
   const colors = isInitial ? getColorsFromHash() : []

   cols.forEach((col, index) => {
      const isLocked = col.querySelector('i').classList.contains('fa-lock')
      const text = col.querySelector('h2')
      const button = col.querySelector('button')

      if (isLocked) {
         colors.push(text.textContent)
         return
      }

      const color = isInitial
         ? colors[index]
            ? colors[index]
            : chroma.random()
         : chroma.random()

      if (!isInitial) {
         colors.push(color)
      }

      text.textContent = color
      col.style.background = color

      setTextColor(text, color)
      setTextColor(button, color)
   })

   updateColorsHash(colors)
}

function setTextColor(text, color) {
   const luminance = chroma(color).luminance()
   text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
   document.location.hash = colors
      .map((col) => {
         return col.toString().substring(1)
      })
      .join('-')
}

function getColorsFromHash() {
   if (document.location.hash.length > 1) {
      return document.location.hash
         .substring(1)
         .split('-')
         .map((color) => '#' + color)
   }
   return []
}

setRandomColors(true)
