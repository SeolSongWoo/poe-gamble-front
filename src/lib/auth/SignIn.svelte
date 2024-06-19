<script>
    import {Label, Input, Checkbox, A, Button, Card, Alert} from 'flowbite-svelte';

    export let title = 'LOGIN';
    export let site = {
        name: 'Flowbite',
        img: '/favicon.png',
        link: '/',
        imgAlt: 'FlowBite Logo'
    };
    export let form = {
        invalidEmail: false,
        passwordLength: false,
        badRequest: false,
        unAuthorized: false,
    };
    export let rememberMe = true;
    export let lostPassword = true;
    export let createAccount = true;
    export let lostPasswordLink = '';
    export let loginTitle = 'Login to your account';
    export let registerLink = '';
    export let createAccountTitle = 'Create account';

    export let mainClass = 'bg-gray-50 dark:bg-gray-900 w-full';
    export let mainDivClass =
        'flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900';
    export let siteLinkClass =
        'flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white';
    export let siteImgClass = 'mr-4 h-11';
    export let cardH1Class = 'text-2xl font-bold text-gray-900 dark:text-white';
    export let alertClass = 'red';
    export let alertSpanClass = 'font-medium';
</script>

<main class={mainClass}>
    <div class={mainDivClass}>
        <a href={site.link} class={siteLinkClass}>
            <img src={site.img} class={siteImgClass} alt={site.imgAlt}/>
            <span>{site.name}</span>
        </a>
        {#if form?.invalidEmail}
            <Alert color="{alertClass}">
                <span class="{alertSpanClass}">Fail</span>
                이메일 형식이 맞지 않습니다.
            </Alert>
        {:else if form?.badRequest}
            <Alert color="{alertClass}">
                <span class="{alertSpanClass}">Fail</span>
                정상적인 접근이 아닙니다.
            </Alert>
        {:else if form?.unAuthorized}
            <Alert color="{alertClass}">
                <span class="{alertSpanClass}">Fail</span>
                아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 닫시 확인해주세요.
            </Alert>
        {/if}
        <!-- Card -->
        <Card class="w-full" size="md" border={false}>
            <h1 class={cardH1Class}>
                {title}
            </h1>
            <form class="mt-8 space-y-6" method="post">
                <slot/>
                {#if rememberMe}
                    <div class="flex items-start">
                        {#if rememberMe}
                            <Checkbox class="accent-primary-600" name="remember">Remember me</Checkbox>
                        {/if}
                    </div>
                {/if}
                <Button color="dark" type="submit" size="lg">{loginTitle}</Button>
                {#if createAccount}
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Not registered? <A href={registerLink}>{createAccountTitle}</A>
                    </div>
                {/if}
            </form>
        </Card>
    </div>
</main>