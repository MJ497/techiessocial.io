// sidebar

const menuItems = document.querySelectorAll('.menu-item');

// messages
const messagesNotification =  document.querySelector('#message-notification');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');
const mopen = document.querySelector('.messageopen');
const right = document.querySelector('.right');
const mclose = document.querySelector('.bx-x');
const chatroom = document.querySelector('#chatroom');
const chtrm = document.querySelector('.chatroom');

// theme
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSize = document.querySelectorAll('.choose-size span');
const colorPalette = document.querySelectorAll('.choose-color span');
var root = document.querySelector(':root');
const bg1 = document.querySelector('.bg-1');
const bg2 = document.querySelector('.bg-2');
const bg3 = document.querySelector('.bg-3');


// remove active class
const changeActiveItem = () => {
    menuItems.forEach(item =>{
        item.classList.remove('active');
    })
}




menuItems.forEach(item =>{

    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if(item.id !='notifications'){
            document.querySelector('.notification-popup').style.display ='none';
        }else{
            document.querySelector('.notification-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none'
        };
    })
})

// ======messages

messagesNotification.addEventListener('click' , () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display ='none';
    setTimeout(() =>{
        messages.style.boxShadow = "none"
    },2000)

   
});
const mediaQuery = window.matchMedia('(max-width: 992px)');

function smallscreen(){
mopen.addEventListener('click', () =>{
    right.style.display ="flex";

    
})
}

// Initial check to see if the function should be executed
if (mediaQuery.matches) {
    smallscreen();
  }

// Add a listener to execute the function when the screen size changes
mediaQuery.addListener((event) => {
    if (event.matches) {
      smallscreen();
    }
    else{

        right.style.display = "block";
    }
})

mclose.addEventListener('click', () =>{
right.style.display = "none";
})
 

// chatroom toggle============
chatroom.addEventListener('click', () =>{
chtrm.style.display = "flex";
})
// close modal

const closeCR = (e) =>
{
    if(e.target.classList.contains('chatroom')){
        chtrm.style.display = 'none';
    }
}
chtrm.addEventListener('click', closeCR);

chatroom.addEventListener('click', chtrm);


// search
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(chat => {
        let name = chat.querySelector('h5').textContent.toLowerCase();
   if(name.indexOf(val) != -1){
    chat.style.display = 'flex';
   }else{
    chat.style.display = 'none'; 
   }
    })
}
messageSearch.addEventListener('keyup', searchMessage)


// theme customization

// open modal
const openThemeModal =  () =>{
themeModal.style.display = 'grid';
}

// close modal

const closeThemeModal = (e) =>
{
    if(e.target.classList.contains('customize-theme')){
        themeModal.style.display = 'none';
    }
}
themeModal.addEventListener('click', closeThemeModal);

theme.addEventListener('click', openThemeModal);


const setThemeSettings = (settings) => {
    localStorage.setItem('themeSettings', JSON.stringify(settings));
  };
  
  // Function to get theme settings from localStorage
  const getThemeSettings = () => {
    return JSON.parse(localStorage.getItem('themeSettings')) || {};
  };


  // Set initial theme settings
const initialSettings = getThemeSettings();

// Background
if (initialSettings.background) {
  const activeBgButton = document.getElementById(initialSettings.background);
  if (activeBgButton) {
    activeBgButton.classList.add('active');
  }
} else {
  // Set default background if no setting is found
  bg1.classList.add('active');
}
// fontsize

// remove active class from font size
const removeSizeSelector = () => {
    fontSize.forEach(size => {
        size.classList.remove('active');
    })
}

fontSize.forEach(size => {
size.addEventListener('click', () => {

    removeSizeSelector();
    let fontSize;
    size.classList.toggle('active');

    if (size.classList.contains('font-size-1')){
        fontSize ='12px';
        root.style.setProperty('--sticky-top-left', '5.4rem');
        root.style.setProperty('--sticky-top-right', '5.4rem');
    }else if(size.classList.contains('font-size-2')){
        fontSize ='13px';
        root.style.setProperty('--sticky-top-left', '5.4rem');
        root.style.setProperty('--sticky-top-right', '-7rem');
    }else if(size.classList.contains('font-size-3')){
        fontSize ='16px';
        root.style.setProperty('--sticky-top-left', '-2rem');
        root.style.setProperty('--sticky-top-right', '-17rem');
    }else if(size.classList.contains('font-size-4')){
        fontSize ='19px';
        root.style.setProperty('--sticky-top-left', '-5rem');
        root.style.setProperty('--sticky-top-right', '-25rem');
    }else if(size.classList.contains('font-size-5')){
        fontSize ='22px';
        root.style.setProperty('--sticky-top-left', '12rem');
        root.style.setProperty('--sticky-top-right', '-35rem');
    }

    document.querySelector('html').style.fontSize = fontSize;
})

   
})
// remove active from color
const changeActiveColorClass = () =>{
    colorPalette.forEach(colorpicker => {
        colorpicker.classList.remove('active');
    })
}


// change primary colors
colorPalette.forEach(color => {
    color.addEventListener('click', () =>{
        let primary;

        // remove active from color
        changeActiveColorClass();
        if(color.classList.contains('color-1')){
            pimaryHue = 252;

        }else if(color.classList.contains('color-2')){
            primaryHue = 52;
        }else if(color.classList.contains('color-3')){
            primaryHue = 352;
        }else if(color.classList.contains('color-4')){
            primaryHue = 152;
        }else if(color.classList.contains('color-5')){
            primaryHue = 202;
        }
color.classList.add('active');
        root.style.setProperty('--primary-color-hue',primaryHue);
    })
})


// theme background

let lightcolorlightness;
let darkcolorlightness;
let whitecolorlightness;

const changeBg = () => {
    root.style.setProperty('--light-color-lightness', lightcolorlightness);
    root.style.setProperty('--dark-color-lightness', darkcolorlightness);
    root.style.setProperty('--white-color-lightness', whitecolorlightness);
}


// bg1.addEventListener('click', () =>{
//     // add active class
// bg1.classList.add('active');

// bg2.classList.remove('active');
// bg3.classList.remove('active');
// window.location.reload();
// });
bg1.addEventListener('click', () => {
    darkcolorlightness = '17%';
    whitecolorlightness ='100%';
    lightcolorlightness = '95%';
    
    
    // add active class
    bg1.classList.add('active');
    
    bg2.classList.remove('active');
    bg3.classList.remove('active');
    changeBg();
    });


bg2.addEventListener('click', () => {
darkcolorlightness = '95%';
whitecolorlightness ='20%';
lightcolorlightness = '15%';


// add active class
bg2.classList.add('active');

bg1.classList.remove('active');
bg3.classList.remove('active');
changeBg();
});

bg3.addEventListener('click', () => {
    darkcolorlightness = '95%';
    whitecolorlightness ='10%';
    lightcolorlightness = '0%';
    
    
    // add active class
    bg3.classList.add('active');
    
    bg1.classList.remove('active');
    bg2.classList.remove('active');
    changeBg();
    });