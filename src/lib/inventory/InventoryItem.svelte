<script>
    import {createEventDispatcher} from "svelte";
    import {CARD_META_DATA} from "$lib/item/card/CardMetaData.js";

    export let itemProps;

    let item;

    const dispatch = createEventDispatcher();

    $: switch (itemProps.type) {
        case "CARD" :
            item = {
                name : itemProps.name,
                src : "/image/inven_card.png",
                stock : itemProps.stock,
                props: itemProps
            }
            break;
    }

    function handleCLick(event) {
        dispatch('click', {item,shiftKey:event.shiftKey,ctrlKey:event.ctrlKey});
    }

    function handleView(event) {
        dispatch('view', item);
    }
</script>

<div on:click={handleCLick} on:mouseenter={handleView} >
    <img src={item.src} alt="card"/>
    <div class="{item.stock === CARD_META_DATA[item.name].maxQuantity ? 'aqua' : ''}">{item.stock}</div>
</div>

<style>
    .aqua {
        color: #04BEF9;
    }
</style>