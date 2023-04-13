<script lang="ts">
  import { gql } from "@apollo/client";
  import { onMount } from "svelte";
  import { getService } from "../connection/Conexion";

  const query = gql`
    query Carrusel {
      seccCarrusels(filters: { contribuyente: { Type: { eq: "General" } } }) {
        data {
          id
          attributes {
            Title
            SubTitle
            BackGround {
              data {
                attributes {
                  url
                }
              }
            }
            Image {
              data {
                attributes {
                  url
                }
              }
            }
            ToLink
          }
        }
      }
    }
  `;
  let carrusel;
  let cliente = new getService();

  let get_footer = async () => {
    try {
      let result = await cliente.getConexion().query({ query });
      let info = result.data.seccCarrusels;
      carrusel = Object.entries(info.data).map((item) => {
        return {
          id: item[1]["id"],
          attributes: item[1]["attributes"],
        };
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  onMount(async () => {
    get_footer();
  });
</script>

{#if carrusel}
  <section class="carrusel">
    <div
      id="carouselExampleDark"
      class="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        {#each carrusel as car, i}
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to={i}
            class={i == 0 ? "active" : ""}
            aria-label="Slide {i + 1}"
          />
        {/each}
      </div>
      <div class="carousel-inner">
        {#each carrusel as car, i}
          <div
            class="carousel-item {i == 0 ? 'active' : ''}"
            data-bs-interval="5000"
          >
            <img
              class="d-block w-100 fondo__carrusel"
              src="http://18.213.77.154:1337{car.attributes.BackGround.data
                .attributes.url}"
              alt={car.attributes.Title}
            />
            <div class="carousel-caption">
              <div class="container">
                <div class="row">
                  <div class="col carrusel__posicion1">
                    <div class="picture__imagen">
                      <img
                        class="imagen__carousel"
                        src="http://18.213.77.154:1337{car.attributes.Image.data
                          .attributes.url}"
                        alt={car.attributes.Title}
                      />
                    </div>
                  </div>
                  <div class="col carrusel__posicion2">
                    <div class="title__carousel">
                      <h1>{car.attributes.Title}</h1>
                      <div class="button__carousel" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true" />
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true" />
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
{/if}

<style>
  .carousel {
    margin-top: 10px;
  }

  .carousel-control-next,
  .carousel-control-prev {
    width: 5%;
  }
  .carousel-control-next-icon,
  .carousel-control-prev-icon {
    background-color: rgba(0, 0, 0, 0.7);
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }
  .carousel-indicators [data-bs-target] {
    height: 0.3rem;
    width: 0.3rem;
    padding: 0.3rem;
    margin: 0.6rem;
    border-radius: 50%;
    background-color: #1c5d50;
  }
  .carousel-indicators .active {
    background-color: rgba(0, 0, 0, 0.7);
  }
  .carousel-caption {
    left: 0;
    height: 100%;
    width: 100%;
    margin-top: 20%;
  }
  .container {
    height: 50%;
    width: 100%;
    max-width: 100%;
    margin-left: 0;
  }
  .carousel-caption .row {
    height: 50%;
    width: 100%;
    max-width: 100%;
    margin-left: 0;
    margin-top: 1%;
  }
  .carousel-caption h1 {
    color: #e9d9be;
  }
  .carrusel__posicion1 {
    position: relative;
  }
  .carrusel__posicion2 {
    position: relative;
  }
  .picture__imagen {
    display: none;
    max-height: 100%;
    max-width: 100%;
  }
  .title__carousel {
    text-align: center;
    margin-left: 5%;
    margin-right: 5%;
  }
  .title__carousel h1 {
    padding-top: 25%;
    font-size: 25px;
  }

  @media (max-width: 576px) {
    .carousel-indicators {
      display: none;
    }
    .title__carousel {
      justify-content: space-evenly;
      flex-direction: column;
      display: flex;
      align-items: center;
    }
    .carrusel__posicion1 {
      display: none;
    }
  }

  @media (min-width: 576px) and (max-width: 628px) {
    .picture__imagen {
      display: block;
    }
    .imagen__carousel {
      height: 200px;
      width: 200px;
      margin-top: 24%;
      margin-left: 10%;
      display: block;
      align-items: center;
      position: absolute;
      background-repeat: no-repeat;
      border-radius: 50%;
    }
    .title__carousel {
      text-align: start;
      margin-left: 10%;
      margin-right: 5%;
    }
    .title__carousel h1 {
      padding-top: 50%;
      font-size: 23px;
      font-weight: 300;
      font-family: "montserratregular", sans-serif;
      text-orientation: initial;
    }
  }
  @media (min-width: 628px) and (max-width: 728px) {
    .picture__imagen {
      display: block;
    }
    .imagen__carousel {
      height: 250px;
      width: 250px;
      margin-top: 20%;
      margin-left: 10%;
      display: block;
      align-items: center;
      position: absolute;
      background-repeat: no-repeat;
      border-radius: 50%;
    }
    .title__carousel {
      text-align: start;
      margin-left: 10%;
      margin-right: 5%;
    }
    .title__carousel h1 {
      padding-top: 50%;
      font-size: 25px;
      font-weight: 300;
      font-family: "montserratregular", sans-serif;
      text-orientation: initial;
    }
  }
  @media (min-width: 728px) and (max-width: 868px) {
    .picture__imagen {
      display: block;
    }
    .imagen__carousel {
      height: 300px;
      width: 300px;
      margin-top: 20%;
      margin-left: 15%;
      display: block;
      align-items: center;
      position: absolute;
      background-repeat: no-repeat;
      border-radius: 50%;
    }
    .title__carousel {
      text-align: start;
      margin-left: 10%;
      margin-right: 5%;
    }
    .title__carousel h1 {
      padding-top: 50%;
      font-size: 30px;
      font-weight: 300;
      font-family: "montserratregular", sans-serif;
      text-orientation: initial;
    }
  }
  @media (min-width: 868px) and (max-width: 992px) {
    .picture__imagen {
      display: block;
    }
    .imagen__carousel {
      height: 400px;
      width: 400px;
      margin-top: 12%;
      margin-left: 10%;
      display: block;
      align-items: center;
      position: absolute;
      background-repeat: no-repeat;
      border-radius: 50%;
    }
    .title__carousel {
      text-align: start;
      margin-left: 10%;
      margin-right: 5%;
    }
    .title__carousel h1 {
      padding-top: 50%;
      font-size: 35px;
      font-weight: 300;
      font-family: "montserratregular", sans-serif;
      text-orientation: initial;
    }
  }
  @media (min-width: 992px) and (max-width: 1259px) {
    .picture__imagen {
      display: block;
    }
    .imagen__carousel {
      height: 500px;
      width: 500px;
      margin-top: 7%;
      margin-left: 10%;
      display: block;
      align-items: center;
      position: absolute;
      background-repeat: no-repeat;
      border-radius: 50%;
    }
    .title__carousel {
      text-align: start;
      margin-left: 10%;
      margin-right: 5%;
    }
    .title__carousel h1 {
      padding-top: 50%;
      font-size: 40px;
      font-weight: 300;
      font-family: "montserratregular", sans-serif;
      text-orientation: initial;
    }
  }
  @media (min-width: 1260px) {
    .picture__imagen {
      display: block;
    }
    .imagen__carousel {
      height: 600px;
      width: 600px;
      margin-top: 10%;
      margin-left: 15%;
      display: block;
      align-items: center;
      position: absolute;
      background-repeat: no-repeat;
      border-radius: 50%;
    }
    .title__carousel {
      text-align: start;
      margin-left: 10%;
      margin-right: 5%;
    }
    .title__carousel h1 {
      padding-top: 50%;
      font-size: 40px;
      font-weight: 300;
      font-family: "montserratregular", sans-serif;
      text-orientation: initial;
    }
  }
</style>
