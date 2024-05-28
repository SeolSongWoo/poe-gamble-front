<script>

    import {CARD_META_DATA} from "$lib/CardMetaData.js";
    import InventoryItem from "$lib/InventoryItem.svelte";
    import {createEventDispatcher, onMount} from "svelte";

    /**
     * @type {Array[any]}
     */
    export let cards = [];

    export let onClick = () => {};

    const dispatch = createEventDispatcher();

    let items = [];

    $: if(cards instanceof Array){
        cards.forEach(card => {
            switch (card.name) {
                case CARD_META_DATA.UNREQUITED_LOVE.name :
                case CARD_META_DATA.THE_APOTHECARY.name :
                case CARD_META_DATA.HOUSE_OF_MIRRORS.name :
                    const bundle = bundleCard(card.name, card.stockQuantity, CARD_META_DATA[card.name].maxQuantity);
                    items = items.concat(bundle);
                    break;
                default :
                    return;
            }
        });

        const targetLength = 60;
        if (items.length > targetLength) {
            items = items.slice(0, targetLength);
        } else {
            while (items.length < targetLength) {
                items.push({type: "EMPTY", name: "", stock: "0"});
            }
        }
    }

    function bundleCard(cardName, stockQuantity, maxBundleQuantity) {
        let bundles = [];
        while (stockQuantity > 0) {
            let bundleSize = Math.min(stockQuantity, maxBundleQuantity);
            bundles.push({type: "CARD", name: cardName, stock: bundleSize});
            stockQuantity -= bundleSize;
        }
        return bundles;
    }

    function handleItemClick(event) {
        dispatch('click',event.detail);
    }

</script>
<div class="inventory">
    {#each items as item}
        <div class="inventory-item">
            {#if item.type !== "EMPTY"}
                <InventoryItem on:click={handleItemClick} itemProps={item}/>
            {/if}
        </div>
    {/each}
</div>

<style>
    .inventory {
        display: grid;
        grid-template-rows: repeat(5, 40px);
        grid-auto-flow: column;
        grid-gap: 5px;
        width: max-content;
        margin: 20px;
    }

    .inventory-item {
        width: 40px;
        height: 40px;
        border: 1px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f0f0f0;
    }
</style>