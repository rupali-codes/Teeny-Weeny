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
		alert(err.message);
	}
}

btn.addEventListener('click', function(){
	const link = input.value;
	if(!link){
		throw new Error("Invalid Input");
	}
	const data = shortIt(link);
	data.then(res => {
		c2c.classList.remove('hidden');
		clipboard.value = res.result.original_link;
	})
})

btnCopy.addEventListener('click', function(){
	navigator.clipboard.writeText(clipboard.value);
	alert("Link copied.");
})