function e(e,t,n){const o=new URLSearchParams({image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`https://pixabay.com/api/?${o}&page=${t}&per_page=${n}&key=33163433-7381312326b7cb4a7310bb1a7&q=${e}`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}const{form:t,gallery:n,loadMore:o,error:r,alert:a,endOfCollection:s}={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loadMore:document.querySelector(".load-more"),error:document.querySelector(".error"),alert:document.querySelector(".alert"),endOfCollection:document.querySelector(".collectionEnd")};t.addEventListener("submit",(function(t){if(t.preventDefault(),l=t.currentTarget.elements.searchQuery.value,!l)return a.textContent="Enter something",void setTimeout((()=>{a.textContent=""}),3e3);c=1,e(l,c,15).then((({hits:e,totalHits:t})=>{0===e.length&&(o.hidden=!0,r.textContent="Sorry, there are no images matching your search query. Please try again.",setTimeout((()=>{r.textContent=""}),3e3)),e.length<t&&(o.hidden=!1),n.innerHTML="",s.textContent="",i(e),e.length===t&&0!==e.length&&(s.textContent="We're sorry, but you've reached the end of search results."),c+=1})).catch((e=>console.log(e)))})),o.addEventListener("click",(function(){e(l,c,15).then((({hits:e})=>{e.length<15&&(o.hidden=!0,s.textContent="We're sorry, but you've reached the end of search results."),c+=1,i(e)})).catch((e=>console.log(e)))}));let l="",c=1;function i(e){const t=e.map((({webformatURL:e,largeImageURL:t,tags:n,likes:o,views:r,comments:a,downloads:s})=>`\n  <div class="photo-card">\n  <img src="${e}" alt="${n}" loading="lazy" />\n  <div class="info">\n    <p class="info-item">\n      <b>Likes: ${o}</b>\n    </p>\n    <p class="info-item">\n      <b>Views: ${r}</b>\n    </p>\n    <p class="info-item">\n      <b>Comments: ${a}</b>\n    </p>\n    <p class="info-item">\n      <b>Downloads: ${s}</b>\n    </p>\n  </div>\n</div>`)).join("");n.insertAdjacentHTML("beforeend",t)}
//# sourceMappingURL=index.d91d87b7.js.map
