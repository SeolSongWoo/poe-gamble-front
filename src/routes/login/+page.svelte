<script>

    import {Button} from "flowbite-svelte";

    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<form method="post" action="?/login">
    {#if form?.invalidEmail} <p>이메일 형식을 제대로 입력해주세요.</p> {/if}
    {#if form?.passwordLength} <p>비밀번호 길이는 8자 이내로 작성해주세요.</p> {/if}
    {#if form?.badRequest} <p> 정상적인 경로로 접근해주세요. </p> {/if}
    <input name="email" type="email" value={form?.email ?? ''}>
    <input name="password" type="password" placeholder="Password">
    <Button type="submit">Login</Button>
</form>