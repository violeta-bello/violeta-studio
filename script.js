const DEFAULT_PHOTOS = [

  {
    id: 1,
    title: "Retrato ao entardecer",
    category: "Retratos",
    price: 150,
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: 2,
    title: "Ensaio natural",
    category: "Ensaios",
    price: 250,
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: 3,
    title: "Celebração",
    category: "Eventos",
    price: 500,
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: 4,
    title: "Golden hour",
    category: "Paisagens",
    price: 80,
    url: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: 5,
    title: "Meu melhor amigo",
    category: "Pets",
    price: 40,
    url: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: 6,
    title: "Câmera & flores",
    category: "Produtos",
    price: 60,
    url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: 7,
    title: "Retrato em flores",
    category: "Retratos",
    price: 150,
    url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: 8,
    title: "Praia",
    category: "Paisagens",
    price: 80,
    url: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1000&q=85"
  }

];


const DEFAULT_PRICES = [

  {
    id: 1,
    name: "Retrato",
    price: 150,
    items: [
      "10 fotos editadas",
      "1 local",
      "Entrega digital"
    ]
  },

  {
    id: 2,
    name: "Ensaio pessoal",
    price: 250,
    items: [
      "20 fotos editadas",
      "2 locais",
      "Entrega digital + galeria"
    ]
  },

  {
    id: 3,
    name: "Evento",
    price: 500,
    items: [
      "50+ fotos editadas",
      "Cobertura completa",
      "Galeria online"
    ]
  }

];


function getData(key, fallback) {

  try {

    const value =
      JSON.parse(
        localStorage.getItem(key)
      );

    return value?.length
      ? value
      : fallback;

  } catch {

    return fallback;

  }

}


let photos =
  getData(
    "violetaPhotos",
    DEFAULT_PHOTOS
  );


let prices =
  getData(
    "violetaPrices",
    DEFAULT_PRICES
  );


function renderPhotos(filter = "Todos") {

  const grid =
    document.getElementById("photoGrid");

  if (!grid) return;


  const list =
    filter === "Todos"
      ? photos
      : photos.filter(
          photo =>
            photo.category === filter
        );


  grid.innerHTML =
    list.map(photo => `

      <article
        class="photo-card"
        data-id="${photo.id}"
      >

        <img
          src="${escapeHtml(photo.url)}"
          alt="${escapeHtml(photo.title)}"
          loading="lazy"
        >

        <div class="photo-info">

          <strong>
            ${escapeHtml(photo.title)}
          </strong>

          <small>
            ${escapeHtml(photo.category)}
            •
            R$ ${Number(photo.price)
              .toFixed(2)
              .replace(".", ",")}
          </small>

        </div>

      </article>

    `).join("");


  grid
    .querySelectorAll(".photo-card")
    .forEach(card => {

      card.addEventListener(
        "click",
        () => {

          const photo =
            photos.find(
              p =>
                p.id ==
                card.dataset.id
            );

          openLightbox(photo);

        }
      );

    });

}


function renderPrices() {

  const grid =
    document.getElementById("priceGrid");

  if (!grid) return;


  grid.innerHTML =
    prices.map(
      (price, index) => `

      <article
        class="price-card
        ${index === 1 ? "featured" : ""}"
      >

        <h3>
          ${escapeHtml(price.name)}
        </h3>

        <div class="price">

          R$
          ${Number(price.price)
            .toFixed(2)
            .replace(".", ",")}

        </div>

        <ul>

          ${price.items
            .map(
              item =>
                `<li>
                  ${escapeHtml(item)}
                </li>`
            )
            .join("")}

        </ul>

        <a
          class="btn primary"
          href="#contato"
        >
          Escolher
        </a>

      </article>

    `
    ).join("");

}


function escapeHtml(value) {

  return String(value).replace(
    /[&<>"']/g,

    char => ({

      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"

    }[char])

  );

}


function openLightbox(photo) {

  if (!photo) return;


  document.getElementById(
    "lightboxImage"
  ).src = photo.url;


  document.getElementById(
    "lightboxImage"
  ).alt = photo.title;


  document.getElementById(
    "lightboxCaption"
  ).textContent =
    `${photo.title} — ${photo.category}`;


  document
    .getElementById("lightbox")
    .classList.add("open");

}


document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderPhotos();

    renderPrices();


    /* MENU */

    document
      .querySelector(".menu-toggle")
      ?.addEventListener(
        "click",
        () => {

          document
            .getElementById("mainNav")
            .classList.toggle("open");

        }
      );


    document
      .querySelectorAll(".nav a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            document
              .getElementById("mainNav")
              .classList.remove("open");

          }
        );

      });


    /* FILTROS */

    document
      .querySelectorAll(".filter")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            document
              .querySelectorAll(".filter")
              .forEach(
                btn =>
                  btn.classList.remove(
                    "active"
                  )
              );


            button.classList.add("active");


            renderPhotos(
              button.dataset.filter
            );

          }
        );

      });


    /* CATEGORIAS */

    document
      .querySelectorAll(
        ".category-card[data-filter]"
      )
      .forEach(card => {

        card.addEventListener(
          "click",
          () => {

            const filter =
              card.dataset.filter;


            document
              .querySelectorAll(".filter")
              .forEach(
                button => {

                  button.classList.toggle(
                    "active",
                    button.dataset.filter ===
                      filter
                  );

                }
              );


            renderPhotos(filter);

          }
        );

      });


    /* LIGHTBOX */

    document
      .getElementById("lightboxClose")
      .addEventListener(
        "click",
        () => {

          document
            .getElementById("lightbox")
            .classList.remove("open");

        }
      );


    document
      .getElementById("lightbox")
      .addEventListener(
        "click",
        event => {

          if (
            event.target.id ===
            "lightbox"
          ) {

            event.currentTarget
              .classList.remove("open");

          }

        }
      );


    /* FORMULÁRIO */

    document
      .getElementById("contactForm")
      .addEventListener(
        "submit",
        event => {

          event.preventDefault();


          showToast(
            "Mensagem preparada! Ligue seu formulário a um e-mail ou WhatsApp para receber pedidos."
          );


          event.target.reset();

        }
      );

  }
);


function showToast(message) {

  const toast =
    document.getElementById("toast");


  toast.textContent = message;

  toast.classList.add("show");


  setTimeout(
    () =>
      toast.classList.remove("show"),
    4000
  );

}