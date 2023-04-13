<script lang="ts">
  import { gql } from "@apollo/client";
  import { onMount } from "svelte";
  import { getService } from "./connection/Conexion";
  import Carousel from "./layout/Carousel.svelte";
  import Header from "./layout/Header.svelte";
  import Inicio from "./components/tramites/Inicio.svelte";
  import Section from "./layout/Section.svelte";
  import Footer from "./layout/Footer.svelte";
  import MiniSite from "./layout/MiniSite.svelte";

  const query = gql`
    query Nuevo {
      glTitlePages(filters: { contribuyente: { Type: { eq: "Nuevo" } } }) {
        data {
          id
          attributes {
            Title
            Span
            Icon {
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
  let title;
  let cliente = new getService();

  let get_title = async () => {
    try {
      let result = await cliente.getConexion().query({ query });
      let pages = result.data.glTitlePages;
      title = Object.entries(pages.data).map((item) => {
        return {
          id: item[1]["id"],
          attributes: item[1]["attributes"],
        };
      });
      console.log(title);
    } catch (e) {
      console.log(e.message);
    }
  };

  onMount(async () => {
    get_title();
  });
</script>

<Header />
<main>
  <Carousel />
  {#if title}
    <div class="container">
      <p class="tituloprincipal">
        <img
          alt=""
          class="titulo__cuadro"
          src="http://18.213.77.154:1337{title[0].attributes.Icon.data
            .attributes.url}"
        />
        {title[0].attributes.Title ? title[0].attributes.Title : ""}
        <span class="letra__bold"
          >{title[0].attributes.Span ? title[0].attributes.Span : ""}</span
        >
      </p>
      <Inicio />
      <p class="tituloprincipal">
        <img
          alt=""
          class="titulo__cuadro"
          src="http://18.213.77.154:1337{title[1].attributes.Icon.data
            .attributes.url}"
        />
        {title[1].attributes.Title ? title[1].attributes.Title : ""}
        <span class="letra__bold"
          >{title[1].attributes.Span ? title[1].attributes.Span : ""}</span
        >
      </p>
    </div>
  {/if}
</main>
<MiniSite />
<Section />
<Footer />

<style>
  main {
    margin-top: 10%;
  }
  .tituloprincipal {
    font-size: 2.5rem;
    font-family: "montserratregular", sans-serif;
    color: #255b4d;
    margin-top: 1%;
    text-transform: uppercase;
    line-height: 120%;
  }
  .titulo__cuadro {
    margin-right: 1%;
    margin-bottom: 0.5rem;
  }
  .letra__bold {
    font-family: "montserratbold", sans-serif;
    font-weight: 600;
  }
</style>
