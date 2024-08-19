const navItems = document.querySelector('.nav').children;
const sections = document.querySelectorAll('section');
let currentSection = 0;
let currentNavSelected = 0;
let autoScrolling = false;

// Fibonacci ratios
const navSizes = [
    '5em',
    `${5/1.6}em`,
    `${5/1.6**2}em`,
    `${5/1.6**3}em`
]
const assignments = [
    [0,1,2,3],
    [2,0,1,3],
    [3,1,0,2],
    [3,2,1,0]
]

const colorClass = [
    'a',
    'b',
    'c',
    'd'
]

function resetNav(selected){
    const i = parseInt(selected.getAttribute('data-index'),10);
    currentNavSelected = i;
    Array.from(navItems).forEach((item, j)=>{
        item.style.height = item.style.width = navSizes[assignments[i][j]];
        item.id = colorClass[assignments[i][j]];
    })
    selected.firstElementChild.style.visibility = 'visible';
    Array.from(navItems).forEach(item=>{
        if(item!=selected) item.firstElementChild.style.visibility = 'hidden';
    })
    console.log("Reset nav!");
}

Array.from(navItems).forEach(item=>{
    item.addEventListener('mouseover',()=>{
        resetNav(item);
    })
    item.addEventListener('click',()=>{
        autoScrolling = true;
        setTimeout(()=>autoScrolling=false,750);
    })
})

window.onscroll = () => {
    if (autoScrolling) return;
    let current = '';
    sections.forEach(section=>{
        if (scrollY >= section.offsetTop - 75) current = section.getAttribute('id');
        Array.from(navItems).forEach(item=>{
            if(item.getAttribute('data-id')==current) resetNav(item);
        })
    })
}

resetNav(Array.from(navItems)[0]);