//Switching betwteen functionality on page

function dis(pageID) {
	let pages = document.querySelectorAll(".fun");
	pages.forEach(page => {
		page.style.display = "none";
	});
	document.querySelector(pageID).style.display = "block"

}
location.hash = "";
location.hash = "#Word-search";
window.addEventListener("hashchange",(hash)=>{
	dis(location.hash);
});



// word search



