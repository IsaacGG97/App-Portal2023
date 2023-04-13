<script lang="ts">
  import { gql } from "@apollo/client";
  import { onMount } from "svelte";
  import { getService } from "../connection/Conexion";
  import Logo from "./Logo.svelte";

  const query = gql`
    query Header {
      glHeaders(filters: { contribuyente: { Type: { eq: "General" } } }) {
        data {
          id
          attributes {
            Label
            ToLink
            gl_sub_headers {
              data {
                id
                attributes {
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
  let menu;
  let cliente = new getService();

  let get_logo = async () => {
    try {
      let result = await cliente.getConexion().query({ query });
      let header = result.data.glHeaders;
      menu = Object.entries(header.data).map((item) => {
        return {
          id: item[1]["id"],
          attributes: item[1]["attributes"],
        };
      });
      console.log(menu);
    } catch (e) {
      console.log(e.message);
    }
  };

  onMount(async () => {
    get_logo();
  });
</script>

<header>
  <div class="container">
    <div class="row">
      <div class="col-12 logo">
        <a href="/"><Logo /></a>
      </div>
    </div>
  </div>
  <nav class="navbar navbar-expand-lg navbar-light nav-container">
    <div class="container">
      {#if menu}
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 navbar-nav-scroll">
            {#each menu as mn}
              {#if mn.attributes.gl_sub_headers.data.length === 0}
                <li class="nav-item">
                  <a
                    class="nav-link home"
                    aria-current="page"
                    href={mn.attributes.ToLink}>{mn.attributes.Label}</a
                  >
                </li>
              {:else}
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href={mn.attributes.ToLink}
                    id="navbarScrollingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {mn.attributes.Label}
                  </a>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="navbarScrollingDropdown"
                  >
                    {#each mn.attributes.gl_sub_headers.data as sbmn}
                      <li>
                        <a class="dropdown-item" href={sbmn.attributes.ToLink}
                          >{sbmn.attributes.Label}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </li>
              {/if}
            {/each}
          </ul>
          <form class="d-flex">
            <input
              class="form-control me-12"
              type="search"
              placeholder="Buscar"
              aria-label="Search"
            />
          </form>
          <div class="checkbox-wrapper-54">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider" />
            </label>
          </div>
        </div>
      {/if}
    </div>
  </nav>
</header>

<style>
  header {
    display: inline-block;
    width: 100%;
    -webkit-box-shadow: 0px 0px 10px -2px #000000;
    box-shadow: 0px 0px 10px -2px #000000;
    width: 100%;
    position: fixed;
    background: #fff;
    color: #333;
    z-index: 99998;
    top: 0;
  }
  .logo {
    margin: 2em 0;
  }
  nav {
    background: #265b4d;
    color: #fff;
    padding: 0;
    box-shadow: 0px 5px 20px -17px rgba(0, 0, 0, 0.34);
  }
  .nav-link {
    display: block;
    padding: 0.8rem 1rem;
  }
  .navbar-toggler {
    background-color: #fff;
    margin: 0.8rem 1rem;
  }
  .nav-container {
    margin-top: 0;
    margin-bottom: 0;
  }
  .navbar-nav {
    height: 100%;
    width: 100%;
  }
  .navbar-nav > li {
    margin-left: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  .navbar-nav .nav-link {
    font-family: "montserratbold", sans-serif;
    color: #fff;
    font-weight: 600;
  }
  .navbar-nav > li > a:hover,
  .navbar-nav > li > a:focus {
    background-color: rgba(28, 94, 81, 0.2);
    color: #fff;
  }
  .navbar-nav .dropdown-menu {
    background-color: #c9e4df;
    width: 100%;
    border: 0;
    padding-top: 10px;
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    margin-top: 0;
    border-top: 0;
    border-radius: 10px;
    left: 0;
  }
  ul > li:hover {
    background-color: rgba(109, 195, 178, 0.8);
  }
  .dropdown-menu > li > a {
    padding: 8px 15px;
    color: #255b4d;
    line-height: 120%;
    white-space: break-spaces;
    font-size: 14px;
    font-family: "montserratregular", sans-serif;
    font-weight: 300;
  }
  .dropdown-menu > li > a:hover {
    width: 100%;
    background-color: #e5bd89;
    color: #fff;
  }
  .dropdown-item {
    padding: 1em 0;
    width: 100%;
  }
  form {
    margin-right: 2em;
  }
  /**Check Box*/
  .checkbox-wrapper-54 input[type="checkbox"] {
    visibility: hidden;
    display: none;
    margin-left: 2em;
  }

  .checkbox-wrapper-54 *,
  .checkbox-wrapper-54 ::after,
  .checkbox-wrapper-54 ::before {
    box-sizing: border-box;
  }

  /* The switch - the box around the slider */
  .checkbox-wrapper-54 .switch {
    --width-of-switch: 3.5em;
    --height-of-switch: 2em;
    /* size of sliding icon -- sun and moon */
    --size-of-icon: 1.4em;
    /* it is like a inline-padding of switch */
    --slider-offset: 0.3em;
    position: relative;
    width: var(--width-of-switch);
    height: var(--height-of-switch);
    display: inline-block;
  }

  /* The slider */
  .checkbox-wrapper-54 .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f4f4f5;
    transition: 0.4s;
    border-radius: 30px;
  }

  .checkbox-wrapper-54 .slider:before {
    position: absolute;
    content: "";
    height: var(--size-of-icon, 1.4em);
    width: var(--size-of-icon, 1.4em);
    border-radius: 20px;
    left: var(--slider-offset, 0.3em);
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
    transition: 0.4s;
  }

  .checkbox-wrapper-54 input:checked + .slider {
    background-color: #303136;
  }

  .checkbox-wrapper-54 input:checked + .slider:before {
    left: calc(
      100% - (var(--size-of-icon, 1.4em) + var(--slider-offset, 0.3em))
    );
    background: #303136;
    /* change the value of second inset in box-shadow to change the angle and direction of the moon  */
    box-shadow: inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb;
  }
</style>
