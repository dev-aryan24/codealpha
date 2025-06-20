const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const lightBox = document.querySelector(".lightbox");
const closeBtn = lightBox.querySelector(".uil-times");
const downloadImgBtn = lightBox.querySelector(".uil-import");
const apiKey = "ADs0k5PkiBG3hrfdePrbWOuMT4Vg0aKY9EmoRfLu96VeueMVe4mCCHUb"; // Added missing 'l' at the end
const perPage = 10;
let currentPage = 2;
let searchTerm = null;



const downloadImg = (imgURL) => {
  fetch(imgURL).then(res => res.blob()).then(file => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file)
    a.download = new Date().getTime();
    a.click();
  }).catch(() => alert("Failed to download image!"));
}

const showLightbox = (name, img) => {
  lightBox.querySelector("img").src = img;
  lightBox.querySelector("span").innerText = name;
  downloadImgBtn.setAttribute("data-img", img);
  lightBox.classList.add("show");
  document.body.style.overflow = "hidden";
}

const hideLightbox = () => {
  lightBox.classList.remove("show");
  document.body.style.overflow = "auto";
}

// Function to generate HTML from image data
const generateHTML = (images) => {
  imagesWrapper.innerHTML += images.map(img =>
    `<li class="card" onclick= "showLightbox('${img.photographer}', '${img.src.large2x}')">
        <img src="${img.src.large2x}" alt="img" />
        <div class="details">
          <div class="photographer">
            <i class="uil uil-camera"></i>
            <span>${img.photographer}</span>
          </div>
          <button onclick="downloadImg('${img.src.large2x}'); event.stopPropagation();">
          <i class="uil uil-import"></i>
          </button>
        </div>
      </li>`
  ).join("");
};

// Function to fetch images from API
const getImage = (apiURL) => {
  loadMoreBtn.innerText = "Exploring...";
  loadMoreBtn.classList.add("disabled");

  fetch(apiURL, {
    headers: { Authorization: apiKey }
  })
  .then(res => res.json())
  .then(data => {
    generateHTML(data.photos);
    loadMoreBtn.innerText = "Explore More";
    loadMoreBtn.classList.remove("disabled");
  })
  .catch(err => console.error("Error fetching images:", err));
};

const loadMoreImages = () => {
  currentPage++;
  let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  apiURL = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiURL;
  getImage(apiURL);
}

const loadSearchImages = (e) => {
  if(e.target.value === "") return searchTerm = null;
  if(e.key === "Enter") {
    currentPage = 1;
    searchTerm = e.target.value;
    imagesWrapper.innerHTML = "";
    getImage( `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
  }
}

// Initial fetch call
getImage(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeBtn.addEventListener("click", hideLightbox);
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img) );