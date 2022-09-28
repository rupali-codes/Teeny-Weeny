const input = document.querySelector('#input');
const error = document.querySelector('#err');
const btn = document.querySelector('#shorten');
const list = document.querySelector('.list');
const history = document.querySelector('#history');
const searchInput = document.querySelector('#searchInput')
const searchBtn = document.querySelector('#searchBtn')

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
btn.addEventListener('click', async function(e) {
    e.preventDefault()
    const link = input.value;
    try {
        if (!link) {
            throw new Error("Please input a valid link :(");
        }
        error.classList.add('hidden');
        input.style.border = 'none';
        const data = await shortIt(link);

        const body = {
                originallink: link,  
                shortlink: data.result.short_link2
            }

        const postreq = await fetch('/shortit', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },   
        })

        input.value = '';

    } catch (err) {
        input.style.border = "2px solid hsl(0, 87%, 67%)";
        error.classList.remove('hidden');
        error.textContent = err.message;
    }
})

//render links
const renderLinks = (links) => {
    history.innerHTML = '';
    list.classList.remove('hidden');
    for(link of links) {

             const markup = `
                <div class="p-3 lnk">
                    <div class="original">${link.originallink}</div>
                    <div class="shorted">${link.shortlink}</div>
                    <button class="btn rounded ms-md-4" id="copy" data-copy-to-clipboard ="${link.shortlink}">Copy</button>
                </div>
           `
           history.insertAdjacentHTML('afterbegin', markup)
        }
}

//rednering all links of user
fetch('/mylinks')
    .then(res => res.json())
    .then(links => {
  
        renderLinks(links)
       
    })
    .catch(err => console.log(err))


//copying link to clipboard
history.addEventListener('click', function(e) {
    const copy = e.target.closest('#copy');

    if (!copy) return;

    const cpy = copy.dataset.copyToClipboard;
    console.log(cpy);
    navigator.clipboard.writeText(cpy);
    copy.style.backgroundColor = "hsl(255, 11%, 22%)";
    copy.textContent = "Copied!";
})

//implementing searchbar
searchInput.addEventListener('input', () => {
    const input = searchInput.value
    let matched = []

    fetch('/mylinks')
    .then(res => res.json())
    .then(links => {
        for (l of links) {
            if(l.originallink.includes(input))
                matched.push(l)
        }

        if(!matched.length)
            {
                const markup = `
                <div class="p-3 lnk">
                   No links found
                </div>
           `
           history.innerHTML = markup
            }
        else 
            renderLinks(matched)
    })
})


