<script lang="ts">
  import { gql } from "@apollo/client";
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { getService } from "../connection/Conexion";

  const query = gql`
    query Section {
      glSecctions(filters: { contribuyente: { Type: { eq: "General" } } }) {
        data {
          id
          attributes {
            Title
            gl_body_secctions {
              data {
                attributes {
                  Label
                  Contents
                  RichContents
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
        }
      }
    }
  `;
  let section;
  let cliente = new getService();

  let get_section = async () => {
    try {
      let result = await cliente.getConexion().query({ query });
      let info = result.data.glSecctions;
      section = Object.entries(info.data).map((item) => {
        return {
          id: item[1]["id"],
          attributes: item[1]["attributes"],
        };
      });
      console.log(section);
    } catch (e) {
      console.log(e.message);
    }
  };

  onMount(async () => {
    get_section();
  });
</script>

<section class="section__info">
  <div class="container">
    <div class="row">
      {#if section}
        {#each section as sec}
          <div
            class="col-md-4 clo-sm-6 properties {sec.id != 3
              ? 'bordeColor'
              : ''}"
          >
            <p class="title__section">
              {sec.attributes.Title}
            </p>
            {#each sec.attributes.gl_body_secctions.data as bodySection}
              <!-- {console.log("Section: ", bodySection)} -->
              <div class="box__section">
                <a href={bodySection.attributes.ToLink} class="linkStyle">
                  {#if bodySection.attributes.Icon.data !== null}
                    <img
                      src="http://18.213.77.154:1337{bodySection.attributes.Icon
                        .data.attributes.url}"
                      alt="Img"
                    />
                  {:else}
                    <div />
                  {/if}

                  <span class="text__section"
                    >{bodySection.attributes.Label}</span
                  >
                </a>
                <p class="content-text">
                  {#if bodySection.attributes.RichContents != null}
                    <SvelteMarkdown
                      source={bodySection.attributes.RichContents}
                    />
                  {:else}
                    <span />
                  {/if}
                </p>
              </div>
            {/each}
          </div>
        {/each}
      {/if}
    </div>
  </div>
</section>

<style>
  .section__info {
    background: #fff;
    padding: 5%;
  }
  .title__section {
    color: #255b4d;
    font-size: 25px;
    font-family: "montserratbold", sans-serif;
    width: 280px;
    height: 50px;
    font-weight: 700;
    margin: 0 auto;
    text-align: center;
    padding-top: 2%;
  }
  .bordeColor {
    border-right: 0.2rem #255b4d solid;
  }
  .box__section {
    padding-left: 15%;
    margin-top: 5%;
  }
  .linkStyle {
    text-decoration: none;
  }
  .text__section {
    color: #575756;
    font-size: 18px;
    font-family: "montserratbold", sans-serif;
    padding-left: 5%;
    text-align: left;
    font-weight: 800;
  }
  .content-text {
    color: #575756;
    font-size: 16px;
    font-family: "montserratregular", sans-serif;
    text-align: left;
    padding-left: 19%;
    padding-right: 15%;
    padding-top: 1%;
  }
</style>
