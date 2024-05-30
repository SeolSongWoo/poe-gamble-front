<script>

    import {CARD_META_DATA} from "$lib/CardMetaData.js";

    export let isPopupOpen = false;
    export let isCardOpen = false;
    export let openCardData = {};
    export let onSplitCard = () => {};

    let isSplitPopup = false;
    let isHortPopup = false;

    let splitValue = 1;

    $: if(isPopupOpen) {
        isSplitPopup = false;
    }


    function handleSplitClick(event) {
        isSplitPopup = true
    }

    function handleHortClick(event) {
        const cardMaxQuantity = CARD_META_DATA[openCardData.name].maxQuantity;
        if(openCardData.stock > cardMaxQuantity / 2) {
            alert('투입갯수 초과');
            return;
        }
        isCardOpen = true
    }

    function onSplit() {
        if(splitValue > 0 && splitValue < openCardData.stock) {
            console.log(onSplitCard(openCardData,splitValue));
        }
        isSplitPopup = false;
        isPopupOpen = false;
    }
</script>

{#if isPopupOpen}
    <div>
        <button on:click={handleSplitClick}>나누기</button>
        <button on:click={handleHortClick}>푸르미등록</button>
    </div>
{/if}

{#if isSplitPopup}
    <button on:click={() => isSplitPopup = false}>X</button>
    <input type="number" bind:value={splitValue} min="1" max="{openCardData.stock / 2}"/>
    <button on:click={onSplit}>나누기</button>
{/if}