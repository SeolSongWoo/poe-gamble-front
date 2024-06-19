<script>
    import {A, Checkbox, Button, Card, Alert} from 'flowbite-svelte';

    export let title = 'Create a Free Account';
    export let site = {
        name: 'Flowbite1',
        img: '/favicon.png',
        link: '/',
        imgAlt: 'FlowBite Logo1'
    };
    export let form = {
        invalidEmail: false,
        passwordLength: false,
        badRequest: false
    };
    export let acceptTerms = true;
    export let haveAccount = true;
    export let btnTitle = 'Create account';
    export let termsLink = '/';
    export let loginLink = '/';
    export let mainClass = 'bg-gray-50 dark:bg-gray-900 w-full';
    export let mainDivClass =
        'flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900';
    export let siteLinkClass =
        'flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white';
    export let siteImgClass = 'mr-4 h-11';
    export let cardH1Class = 'text-2xl font-bold text-gray-900 dark:text-white';
    export let haveAccountDivClass = 'text-sm font-medium text-gray-500 dark:text-gray-400';
    export let alertClass = 'red'
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
        {:else if form?.passwordLength}
            <Alert color="{alertClass}">
                <span class="{alertSpanClass}">Fail</span>
                비밀번호 길이는 8자리 이상으로 지정해주세요.
            </Alert>
        {:else if form?.badRequest}
            <Alert color="{alertClass}">
                <span class="{alertSpanClass}">Fail</span>
                정상적인 접근이 아닙니다.
            </Alert>
        {/if}
        <!-- Card -->
        <Card class="w-full" size="md" border={false}>
            <h1 class={cardH1Class}>
                {title}
            </h1>
            <form class="mt-8 space-y-6" on:submit|preventDefault>
                <slot/>
                {#if acceptTerms}
                    <Checkbox class="pt-1" name="accept">
						<span>
							I accept the <A href={termsLink}>Terms and Conditions</A>
						</span>
                    </Checkbox>
                {/if}
                <Button color="dark" type="submit" size="lg">{btnTitle}</Button>
                {#if haveAccount}
                    <div class={haveAccountDivClass}>
                        Already have an account? <A href={loginLink}>Login here</A>
                    </div>
                {/if}
            </form>
        </Card>
    </div>
</main>