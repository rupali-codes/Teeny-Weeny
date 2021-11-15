const input = document.querySelector('#input');
const btn = document.querySelector('#shorten');
const clipboard = document.querySelector('#clipboard');
const btnCopy = document.querySelector('#copy');
const c2c = document.querySelector('#c2c');

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
		c2c.classList.remove('hidden');
		clipboard.value = res.result.short_link3;
	}).catch(err => alert(err.message))
})

btnCopy.addEventListener('click', function(){
	if(clipboard.value){
		navigator.clipboard.writeText(clipboard.value);
		alert("Link copied :)");
	}else{
		alert("Nothing to copy :(");
	}
})
