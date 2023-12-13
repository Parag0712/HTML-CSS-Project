const API_KEY = '1ef154704a954bca88fcdccb5c79a58b';
const url = "https://newsapi.org/v2/everything?q="


window.addEventListener("load", () => fetchNews("India"));


// Function For Fetch News

async function fetchNews(query) {
    document.body.style.filter ="blur(2px)"; 
    
    document.body.style.transition ="0.5s ease-in-out"; 
    const resp = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await resp.json()
    bindData(data.articles);

}

function bindData(articles) {
    
    document.body.style.filter ="blur(0)"; 
    document.body.style.transition ="0.5s ease-in-out"; 
    document.getElementById('card-section').style.transition ="0.5s ease-in-out"; 
    document.body.style.background = 'white'
    const cardsContainer = document.getElementById('card-section');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
            cardsContainer.appendChild(cardClone);
    });

}

// fill card data
function fillDataInCard(card, article) {
    const newsImg = card.querySelector('#news-img');
    const newsTitle = card.querySelector('#news-title');
    const newsSrc = card.querySelector('#news-source');
    const newsDesc = card.querySelector('#news-desc');
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.content;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    
    newsSrc.innerHTML = `${article.source.name} · ${date}`;
    //For News Redirect
    card.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
} 

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search-text');
searchBtn.addEventListener('click',searchData)

window.addEventListener('keypress',(e)=>{
    if(e.keyCode === 13){
        searchData()
    }
});

function searchData(){
    const query  = searchInput.value;
     searchInput.value='';
    
    if(!query) return
    fetchNews(query);
}
