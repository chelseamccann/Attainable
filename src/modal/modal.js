export var modal = function(){

    var modal = document.getElementById("simple-modal");
    var closeBtn = document.getElementsByClassName("close-btn")[0];

    closeBtn.addEventListener("click", () => {
        d3.select("#modal-school").node().remove()
        while(d3.select(".modal-body-p").node()){
            d3.select(".modal-body-p").node().remove()
            d3.select("#wordcloud").node().remove()
            d3.select("#bob").node().remove()
        }
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if(e.target === modal){
            d3.select("#modal-school").node().remove()
            while(d3.select(".modal-body-p").node()){
                d3.select(".modal-body-p").node().remove()
                d3.select("#wordcloud").node().remove()
                d3.select("#bob").node().remove()
            }
            modal.style.display = 'none';
        }
    })

}