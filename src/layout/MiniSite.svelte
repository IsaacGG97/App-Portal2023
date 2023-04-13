<script lang="ts">
  import { gql } from "@apollo/client";
  import { onMount } from "svelte";
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import "@splidejs/splide/dist/css/themes/splide-default.min.css";
  import { getService } from "../connection/Conexion";

  const query = gql`
    query MiniSitios {
      glMiniSites(filters: { contribuyente: { Type: { eq: "General" } } }) {
        data {
          id
          attributes {
            Title
            Content
            ToLink
            Image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;
  let minisite;
  let cliente = new getService();

  let get_tramites = async () => {
    try {
      let result = await cliente.getConexion().query({ query });
      let info = result.data.glMiniSites;
      minisite = Object.entries(info.data).map((item) => {
        return {
          id: item[1]["id"],
          attributes: item[1]["attributes"],
        };
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const options = {
    rewind: true,
    type: "loop",
    perPage: 3,
    perMove: 1,
    // autoplay: true,
    arrows: true,
    interval: 2500,
    breakpoints: {
      1200: {
        perPage: 2,
      },
      800: {
        perPage: 1,
      },
    },
  };

  onMount(async () => {
    get_tramites();
  });
</script>

<section class="minisitio">
  {#if minisite}
    <Splide {options}>
      {#each minisite as mn}
        <SplideSlide>
          <div class="mini-sitio">
            <a href={mn.attributes.ToLink}>
              <div class="sitio-picture">
                <img
                  src="http://18.213.77.154:1337{mn.attributes.Image.data
                    .attributes.url}"
                  alt={mn.attributes.Title}
                />
              </div>
              <!-- <div class="sitio-title">
                <p>{mn.attributes.Title}</p>
              </div>
              <div class="sitio-description">
                <p>{mn.attributes.Content}</p>
              </div> -->
            </a>
          </div>
        </SplideSlide>
      {/each}
    </Splide>
  {/if}
  <!-- <div class="catalogo-btn">
    <a href="/"
      ><p>Catálogo de minisitios<i class="fa-solid fa-chevron-right" /></p></a
    >
  </div> -->
</section>

<style>
  a {
    text-decoration: none;
  }
  .minisitio {
    width: 100%;
    background: #f0e7d5;
    padding-top: 5%;
    padding-left: 4%;
    padding-right: 4%;
    padding-bottom: 5%;
    /* display: flex;
      flex-direction: column;
      margin: 2rem 0; */
  }

  .catalogo-btn {
    display: flex;
    font-size: 20px;
    flex-direction: row;
    justify-content: center;
    padding: 2rem;
    font-weight: 600;
  }
  .catalogo-btn > a {
    color: #255b4d;
  }

  .mini-sitio {
    margin-left: 10px;
  }

  .sitio-picture {
    display: flex;
    justify-content: center;
  }

  img {
    max-width: 80%;
  }

  /* .sitio-title {
    font-size: 20px;
    text-align: start;
    font-family: "montserratregular", sans-serif;
    color: #255b4d;
    font-weight: 800;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .sitio-description {
    font-size: 15px;
    text-align: start;
    padding: 1%;
    font-family: "montserratregular", sans-serif;
    color: #255b4d;
    text-transform: uppercase;
    font-weight: 600;
  }

  .sitio-picture:hover,
  .sitio-description:hover,
  .sitio-title:hover {
    cursor: pointer;
  } */
</style>
