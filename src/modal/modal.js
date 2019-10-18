export var modal = function(){

    var modal = document.getElementById("simple-modal");
    var closeBtn = document.getElementsByClassName("close-btn")[0];

    closeBtn.addEventListener("click", () => {
        d3.select("#modal-school").node().remove()
        while(d3.select(".modal-text").node()){
            d3.select(".modal-text").node().remove()
        }
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if(e.target === modal){
            d3.select("#modal-school").node().remove()
            while(d3.select(".modal-text").node()){
                d3.select(".modal-text").node().remove()
            }
            modal.style.display = 'none';
        }
    })

}