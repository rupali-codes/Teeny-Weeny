const statistics = document.querySelector('#statistics')

const statesHTML = (stats) => {
    return `
         <div class="brand item mx-3 box-shadow" style="transform: translateY(25deg);">
            <img src="images/${stats.icon}.svg">
            <h2>${stats.title}</h2>
            <p class="text-muted">
                ${stats.desc}
            </p>
        </div>
    `
}

const statsObj = [
    {
        icon: 'icon-brand-recognition',
        title: 'Brand Recognization',
        desc: 'Boost your brand reconigtion with each click. Generic dont mean a thing. Brnaded links help instil confidence your content.'
    },
    {
        icon: 'icon-detailed-records',
        title: 'Detailed Records',
        desc: 'Boost your brand reconigtion with each click. Generic dont mean a thing. Brnaded links help instil confidence your content.'
    },
    {
        icon: 'icon-fully-customizable',
        title: 'Fully Customizable',
        desc: 'Boost your brand reconigtion with each click. Generic dont mean a thing. Brnaded links help instil confidence your content.'
    } 
]

for(s of statsObj) {
    statistics.insertAdjacentHTML('beforeend', statesHTML(s))
}