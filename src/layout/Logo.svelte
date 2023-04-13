<script lang="ts">
  import { gql } from "@apollo/client";
  import { onMount } from "svelte";
  import { getService } from "../connection/Conexion";

  const query = gql`
    query Logo {
      glLogos {
        data {
          id
          attributes {
            Title
            Descripcion
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
  let logo;
  let cliente = new getService();

  let get_logo = async () => {
    try {
      let result = await cliente.getConexion().query({ query });
      let img = result.data.glLogos;
      logo = img.data;

      // logo = Object.entries(img.data).map((item) => {
      //   return {
      //     id: item[1]["id"],
      //     attributes: item[1]["attributes"],
      //   };
      // });
      console.log(logo);
    } catch (e) {
      console.log(e.message);
    }
  };

  onMount(async () => {
    get_logo();
  });
</script>

{#if logo}
  {#each logo as lg}
    <img
      src="http://18.213.77.154:1337{lg.attributes.Image.data.attributes.url}"
      alt={lg.attributes.Descripcion}
    />
  {/each}
{/if}

<style>
  img {
    max-width: 100%;
  }
</style>
