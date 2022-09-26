const input = document.querySelector('#input');
const error = document.querySelector('#err');
const btn = document.querySelector('#shorten');
const list = document.querySelector('.list');
const history = document.querySelector('#history');
const statistics = document.querySelector('#statistics')

//fetching data
const shortIt = async function(link) {
    try {
        const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}/very/long/link.html`);

        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error("Failed to load data. Please try again :(")
    }
}

//btn shorten it
btn.addEventListener('click', function() {
    const link = input.value;
    try {
        if (!link) {
            throw new Error("Please input a valid link :(");
        }
        error.classList.add('hidden');
        input.style.border = 'none';
        const data = shortIt(link);
        data.then(res => {
            function store(sl) {
                let links;
                let ol;
                if (localStorage.getItem('links') && localStorage.getItem('ol')) {
                    links = JSON.parse(localStorage.getItem('links'))
                    ol = JSON.parse(localStorage.getItem('ol'))
                } else {
                    links = []
                    ol = [];
                }

                links.push(sl)
                ol.push(link);

                localStorage.setItem('links', JSON.stringify(links));
                localStorage.setItem('ol', JSON.stringify(ol));


                if (links) {
                    history.innerHTML = '';
                    list.classList.remove('hidden');
                    for (let i in links) {
                        const markup = `	
						<div class="p-3 lnk">
					        <div class="original">${ol[i]}</div>
					        <div class="shorted">${links[i]}</div>
					        <button class="btn btn-danger rounded ms-md-4" id="copy" data-copy-to-clipboard ="${links[i]}">Copy</button>
					     </div>
						`;

                        history.insertAdjacentHTML('afterbegin', markup);
                    }
                }
            }
            store(res.result.short_link3)
            input.value = '';
        }).catch(err => {
            throw new Error("something went wrong")
        })
    } catch (err) {
        input.style.border = "2px solid hsl(0, 87%, 67%)";
        error.classList.remove('hidden');
        error.textContent = "Please add a link";
    }
})

const c2c = function() {
    history.addEventListener('click', function(e) {
        const copy = e.target.closest('#copy');

        if (!copy) return;

        const cpy = copy.dataset.copyToClipboard;
        console.log(cpy);
        navigator.clipboard.writeText(cpy);
        copy.style.backgroundColor = "hsl(255, 11%, 22%)";
        copy.textContent = "Copied!";
    })
}
c2c();

//--------------------
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