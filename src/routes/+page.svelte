<script context="module">
    /**
     * @typedef {Object} Card
     * @property {number} id
     * @property {string} name
     * @property {number} stockQuantity
     */
</script>

<script>
    import Inventory from "$lib/inventory/Inventory.svelte";

    /** @type {import('./$types').PageServerData} */
    export let data;

    /** @type {Card[]} */
    let cards = data.data;



</script>

<Inventory cards={cards} />