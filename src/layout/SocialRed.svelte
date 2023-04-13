<script lang="ts">
  import { gql } from "@apollo/client";
  import { onMount } from "svelte";
  import { getService } from "../connection/Conexion";

  const query = gql`
    query Redes {
      glSocialReds(filters: { contribuyente: { Type: { eq: "General" } } }) {
        data {
          id
          attributes {
            Label
            ToLink
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

  let redes;
  let cliente = new getService();

  let get_redes = async () => {
    try {
      let result = await cliente.getConexion().query({ query });
      let info = result.data.glSocialReds;
      redes = Object.entries(info.data).map((item) => {
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
    get_redes();
  });
</script>

{#if redes}
  {#each redes as red}
    <a href={red.attributes.ToLink}>
      <img
        class="icono__redes"
        src="http://18.213.77.154:1337{red.attributes.Icon.data.attributes.url}"
        alt={red.attributes.Label}
      />
    </a>
  {/each}
{/if}

<style>
  a {
    text-decoration: none;
  }
  .icono__redes {
    max-width: 100%;
    max-height: 100%;
    margin-left: 5%;
    margin-bottom: 5%;
  }
</style>
