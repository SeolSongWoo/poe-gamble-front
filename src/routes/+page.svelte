<script>
    import Inventory from "$lib/Inventory.svelte";

    let cards = [
        {
            name : "UNREQUITED_LOVE",
            stockQuantity : 20
        },
        {
            name : "THE_APOTHECARY",
            stockQuantity : 8
        },
        {
            name : "HOUSE_OF_MIRRORS",
            stockQuantity : 16
        }
    ]

    function onClick(event) {
        console.log(event.detail);
    }

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/login"><button>Login</button></a>
<Inventory on:click={onClick} cards={cards} />