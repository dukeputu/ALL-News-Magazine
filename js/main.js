
const loadAllProduct = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        const catagory = data.data.news_category;
        // console.log(catagory);
        return catagory;
    }
    catch (error) {
        console.error(error);
    }

}


const setAllMenu = async () => {
    const datas = await loadAllProduct();
    // console.log(datas);
    const menu = document.getElementById('menu');

    datas.forEach((item) => {
        const { category_name, category_id } = item;
        const li = document.createElement('li');
        li.classList.add('li');
        li.innerHTML = ` <span onclick="menuId('${category_id}','${category_name}')" >${category_name}</span>`
        menu.appendChild(li);
    });

}





const menuId = async (id, catagoryName) => {
    // console.log("newsBloog",catagoryName);
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        newsBloog(data.data, catagoryName);

    }
    catch (error) {
        console.log(error);
    }
    // const loder = document.getElementById('loder');
    // loder.classList.add('d-none');
}

const newsBloog = (blog, catagoryName) => {
    // console.log(blog);
    //https://stackoverflow.com/questions/54623130/javascript-sort-an-array-of-objects-by-a-numeric-property-in-each-object
    blog.sort((a, b) => b.total_view - a.total_view)
    //https://stackoverflow.com/questions/54623130/javascript-sort-an-array-of-objects-by-a-numeric-property-in-each-object




    const itams = document.getElementById('itams')
    itams.innerText = blog.length;


    const catagoryNames = document.getElementById('category-name')
    catagoryNames.innerText = catagoryName;

    const newsid = document.getElementById('news');
    newsid.textContent = '';

    const notFound = document.getElementById('not-found');
    notFound.textContent = '';

    if (blog.length === 0) {
        // console.log('foundP roducta');
        notFound.innerHTML = `<h2 class="text-center text-primary">Sorry No News</h2>`
        return;
    }

    blog.forEach((news) => {
        // console.log(news);

        const div = document.createElement('div');

        const { thumbnail_url, title, details, author, total_view, _id, image_url } = news;
        // const sort = total_view.sort
        div.classList.add('item');

        div.innerHTML = `
        <div class="utf_post_block_style utf_post_float_half clearfix row">
            <div class="col-md-3 img-center">
        <div class="utf_post_thumb"> <a href="#"> <img class="img-fluid" src="${thumbnail_url}"
            alt="" /> </a> </div>
      <a class="utf_post_cat" href="#">${catagoryName}</a>
            </div>
            <div class="col-md-9">
        <div class="utf_post_content">
            <h2 class="utf_post_title"> <a href="#">${title}</a> </h2>
            <div class="utf_post_meta"> <span class="utf_post_author"><img class="img-fluid author-img" src="${author.img}"
            alt="" /> <a href="#">${author.name === null ? 'No Data' : author.name}</a></span> <span class="utf_post_date"><i class="fa fa-clock-o"></i> ${author.published_date?.slice(0, 11)}</span> </br>
            <div class="d-flex"> <span class="utf_post_date"><i class="fa fa-eye"></i> ${total_view === null ? 'No Data' : total_view}</span> 
            <ul class="d-flex ul-class">
            <li><i class="fa fa-star" aria-hidden="true"></i></li>
            <li><i class="fa fa-star" aria-hidden="true"></i></li>
            <li><i class="fa fa-star" aria-hidden="true"></i></li>
            <li><i class="fa fa-star" aria-hidden="true"></i></li>
            <li><i class="fa fa-star-half-o" aria-hidden="true"></i></li>
          </ul> </div>
           </div>
            <p>${details.length > 100 ? details.slice(0, 180) + '...' : details}</p>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick="showModal('${_id}')">More</button>
          </div>
             </div>
                </div>
        `
        newsid.appendChild(div);

        // newsid.innerHTML = '';
    })

}




const showModal = async (ids) => {
    // console.log("newsBloog",catagoryName);
    //  console.log(id);
    try {
        const url = `https://openapi.programming-hero.com/api/news/${ids}`;
        const res = await fetch(url);
        const data = await res.json();
        modal(data.data[0]);
        // console.log(data.data[0].title);
    }
    catch (error) {
        console.log(error);
    }


}



const modal = (data) => {
    // console.log('showModal', data.title);
    const { title, image_url, details, author, total_view, } = data;
    const modalCOntent = document.getElementById('modal-content');
    modalCOntent.innerHTML = `
            <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-center" id="myModalLabel">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <img class="img-fluid" src="${image_url}"
            alt="" /> </a>
            <p>${details}</p>
            <span class="utf_post_author"><img class="img-fluid author-img" src="${author.img}"
            alt="" /> <a href="#">${author.name === null ? 'No Data' : author.name}</a></span>  &nbsp;  &nbsp;  &nbsp;  &nbsp;
           <span class="utf_post_date"><i class="fa fa-eye"></i> ${total_view === null ? 'No Data' : total_view}</span> 
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
`;

}


setAllMenu();

menuId('01', 'Breaking News');