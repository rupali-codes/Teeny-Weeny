const input = document.querySelector('#input');
const btn = document.querySelector('#shorten');
const btnCopy = document.querySelector('#copy');
const history = document.querySelector('#history'); 

const shortIt = async function(link){
	try{
		const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}/very/long/link.html`);

		const data = await res.json();
		return data;
	}catch(err){
		throw new Error("Failed to fetch data. Please try again :(")
	}
}

btn.addEventListener('click', function(){
	const link = input.value;
	if(!link){
		alert("Please input a valid link :(");
		return;
	}

	const data = shortIt(link);
	data.then(res => {
		function store(sl){
			let links;
			let ol;
			if(localStorage.getItem('links') && localStorage.getItem('ol')){ 
				links = JSON.parse(localStorage.getItem('links'))
				ol = JSON.parse(localStorage.getItem('ol'))
			}
			else{
				links = []
				ol = [];
			}

			links.push(sl)
			ol.push(link);

			localStorage.setItem('links', JSON.stringify(links));
			localStorage.setItem('ol', JSON.stringify(ol));


			if(links){
				history.innerHTML = '';
				for(let i in links){
					const markup = `	
						<div class="p-3 lnk">
					        <div class="original">${ol[i]}</div>
					        <div class="shorted">${links[i]}</div>
					        <button class="btn btn-danger rounded ms-md-4" id="copy" onclick={${navigator.clipboard.writeText(links[i])}}>Copy</button>
					     </div>
						`;

					history.insertAdjacentHTML('beforeend', markup);
				}
			}
		}
		store(res.result.short_link3)
		input.value = '';

	}).catch(err => alert(err.message))
})

const c2c =  function(value){
	console.log("mncsf")
	if(value){
		navigator.clipboard.writeText(value);
		alert("Link copied :)");
	}else{
		alert("Nothing to copy :(");
	}
}
