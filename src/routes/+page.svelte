<script>
    import {P,Button} from 'flowbite-svelte'
</script>

<div class="main-container">
    <div class="title">
        <P size="6xl">POE Gamble Simulator</P>
    </div>
    <div class="link-group">
        <Button size="xl" color="dark" href="/login">FreeMode</Button>
        <Button size="xl" color="dark" href="/login">RankMode</Button>
    </div>
</div>




<style>
    .main-container {
        height: 700px;
    }
    .title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .link-group {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    a {
        background-color: black;
        font-size: 30px;
        color: white;
        padding: 15px 25px;
        text-align: center;
        display: inline-block;
        text-decoration-line: none;
        border-radius: 10px;
    }
</style>