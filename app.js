function dis(pageID) {
	$(".fun").hide();
	$(pageID).show();
}
location.hash = "";
location.hash = "#Word-search";
$(window).on("hashchange",(hash)=>{
	// console.log("hhhhh");

	dis(location.hash);
});
