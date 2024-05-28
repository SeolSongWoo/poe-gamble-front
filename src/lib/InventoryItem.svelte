<script>
    import {createEventDispatcher} from "svelte";

    export let itemProps;
    export let onClick = () => {};

    let item;

    const dispatch = createEventDispatcher();

    switch (itemProps.type) {
        case "CARD" :
            item = {
                src : "/image/invenCard.png",
                stock : itemProps.stock
            }
            break;
    }

    function handleCLick() {
        dispatch('click', item);
    }
</script>

<div on:click={handleCLick} >
    <img src={item.src} alt="card"/>
    <div>{item.stock}</div>
</div>