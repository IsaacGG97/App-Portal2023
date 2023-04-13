<script lang="ts">
  import { gql } from "@apollo/client";
  import { onMount } from "svelte";
  import { getService } from "../../connection/Conexion";

  const query = gql`
    query Tramite {
      seccTramites(filters: { contribuyente: { Type: { eq: "Nuevo" } } }) {
        data {
          id
          attributes {
            Title
            SubTitle
            Icon {
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
  let tramites;
  let cliente = new getService();

  let get_tramites = async () => {
    try {
      let result = await cliente.getConexion().query({ query });
      let info = result.data.seccTramites;
      tramites = Object.entries(info.data).map((item) => {
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
    get_tramites();
  });
</script>

<div class="container">
  <div class="row g-4">
    {#if tramites}
      {#each tramites as tra}
        <div class="col-sm-6 col-md-6 col-lg-3">
          <div class="card cartas__tramites">
            <div class="card-body">
              <div class="contenedor__imagen">
                <img
                  class="round-image icono__carta"
                  src="http://18.213.77.154:1337{tra.attributes.Icon.data
                    .attributes.url}"
                  alt="imagen"
                />
              </div>
              <div class="card-title titulo__carta">
                {tra.attributes.Title}
              </div>
              {#if tra.attributes.SubTitle != null}
                <p class="subtitulo__carta">{tra.attributes.SubTitle}</p>
              {/if}
              <div class="footer__carta">
                <a class="link__carta" href={tra.attributes.ToLink}>
                  ver más
                </a>
              </div>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .cartas__tramites {
    width: 100%;
    height: 280px;
    box-shadow: 0px 0px 17px -3px rgb(0 0 0 / 60%);
    border-radius: 30px;
    padding-right: 15px;
    padding-left: 15px;
  }
  .contenedor__imagen {
    max-width: 100%;
    height: 40%;
  }
  .icono__carta {
    max-width: 100%;
    max-height: 100%;
    margin: 10% 2%;
  }
  .titulo__carta {
    font-size: 2em;
    font-family: "montserratbold", sans-serif;
    color: #255b4d;
    margin-top: 5%;
    line-height: 110%;
    font-weight: 600;
  }
  @media (min-width: 992px) and (max-width: 1400px) {
    .titulo__carta {
      font-size: 1.4em;
    }
    .subtitulo__carta {
      font-size: 1em;
    }
  }
  .subtitulo__carta {
    font-size: 1.2em;
    font-family: "montserratregular", sans-serif;
    font-weight: 100;
    color: #255b4d;
    margin-top: 1%;
  }
  .link__carta {
    color: #bd955a;
    text-decoration: none;
    font-weight: 800;
    font-size: 16px;
    font-family: "montserratbold", sans-serif;
  }
  .footer__carta {
    position: absolute;
    margin-bottom: 5%;
    bottom: 0;
    width: 100%;
  }
  /* .letra__bold {
        font-family: "montserratbold", sans-serif;
        font-weight: 600;
      } */

  /* .titulo__tramite {
        font-weight: 400;
        line-height: 120%;
        margin-bottom: 40px;
      }
    
      @media (max-width: 500px) { 
        .titulo__tramite, .letra__bold {
          font-size: 45px;
        }
      } */
</style>
