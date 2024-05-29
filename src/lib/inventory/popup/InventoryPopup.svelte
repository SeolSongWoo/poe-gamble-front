<script>

    export let isPopupOpen = false;
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