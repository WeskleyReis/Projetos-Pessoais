const search = document.querySelector('.search-bar')
const buttonSearch = document.querySelector('.button-search')

buttonSearch.addEventListener('click', () => {
    const url = 'https://www.google.com/search?q=' + search.value;
    window.open(url, '_self');
})

search.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        const url = 'https://www.google.com/search?q=' + search.value;
        search.click();
        window.open(url, '_self')
    }
})