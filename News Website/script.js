const API_KEY = "ca4089fc9e014f8793c9f8d6a9335ad5";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Germany"));

function reload(){
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles)
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container')
    const newsTemplate = document.getElementById('template-news-card')
    cardsContainer.innerHTML = '';

    articles.forEach((article) =>{
        if(!article.urlToImage) return;
        const cardClone = newsTemplate.content.cloneNode(true)
        fillDataInCard(cardClone , article);
        cardsContainer.appendChild(cardClone)
    })
}


       function fillDataInCard(cardClone , article){
const newsImg = cardClone.querySelector('#news-img')
const newsTitle = cardClone.querySelector('#news-title')
const newsSource = cardClone.querySelector('#news-source')
const newsDesc = cardClone.querySelector('#news-desc')
newsImg.src = article.urlToImage;
newsTitle.innerHTML = article.title;
newsDesc.innerHTML = article.description;

const date = new Date(article.publishedAt).toLocaleString("en-US" , 
{timeZone: "Europe/Paris"}
)
            newsSource.innerHTML = `${article.source.name} -- ${date}`;

            cardClone.firstElementChild.addEventListener('click' , ()=>{
        window.open(article.url, "_blank") }
    )
        }



        let curSelectedNav = null;
        function onNavItemClick(id){
            fetchNews(id);
            const navItem = document.getElementById(id);
            curSelectedNav?.classList.remove('active');
            curSelectedNav = navItem;
            curSelectedNav.classList.add('active');
        }

        const searchButton = document.getElementById('search-button')
        const searchText = document.getElementById('search-input')

        searchButton.addEventListener('click' , ()=>{
        const query = searchText.value;
        if(!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove('active');
        curSelectedNav= null;


        
    

    })
