<script lang="ts">
  import { gql } from "@apollo/client";
  import { onMount } from "svelte";
  import { getService } from "../connection/Conexion";
  import Redes from "./SocialRed.svelte";

  const query = gql`
    query Footer {
      glFooters(filters: { contribuyente: { Type: { eq: "General" } } }) {
        data {
          id
          attributes {
            Title
            gl_body_footers {
              data {
                id
                attributes {
                  SubTitle
                  Label
                  ToLink
                }
              }
            }
          }
        }
      }
    }
  `;
  let footer;
  let cliente = new getService();

  let get_footer = async () => {
    try {
      let result = await cliente.getConexion().query({ query });
      let info = result.data.glFooters;
      footer = Object.entries(info.data).map((item) => {
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

<footer class="footer__info">
  <div class="container">
    <div class="row">
      {#if footer}
        {#each footer as foo}
          <!-- {#if foo.id != 3} -->
          {#if foo.id >= 4}
            <div class="col-sm-4 ms-auto social">
              <h4 class="title__foter">{foo.attributes.Title}</h4>
              <Redes />
            </div>
          {:else}
            <div class="col-sm-4 {foo.id != 3 ? 'bordeColor' : ''}">
              <h4 class="title__foter">
                {foo.attributes.Title}
              </h4>

              <ul class="ulList list-unstyled">
                {#each foo.attributes.gl_body_footers.data as lista}
                  <li class="liList">
                    <a class="topLink" href={lista.attributes.ToLink}>
                      {lista.attributes.SubTitle}</a
                    >
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        {/each}
      {/if}
    </div>
  </div>
</footer>

<style>
  .footer__info {
    color: #fff;
    background: #255b4d;
    padding: 2%;
  }
  /* .footer_content {
      display: grid;
      grid-template-columns: 3fr 1fr;
      column-gap: 4rem;
      grid-auto-flow: column;
    } */
  @media (min-width: 768px) {
    .social {
      margin-top: -15%;
    }
  }
  .title__foter {
    color: #fff;
    font-size: 1.7rem;
    font-family: "montserratbold", sans-serif;
    text-align: space-between;
    margin-bottom: 2%;
    font-weight: 700;
  }
  .topLink {
    color: #fff;
    text-decoration: none;
  }
  .topLink:hover {
    color: #dfc9a2;
    text-decoration: underline;
  }

  .bordeColor {
    border-right: 0.1rem #fff solid;
  }
  .liList {
    font-size: 1.2rem;
  }
  .ulList {
    padding-left: 2rem;
  }
</style>
