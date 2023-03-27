## Moudrá Síť
![alt text](https://moudrasit.cz/wp-content/uploads/2023/02/Group-482001.svg)

[Moudrá Síť](https://moudrasit.cz/) je projekt, který propojuje digitální asistenty a seniory pomocí webové aplikace, přes kterou si senior zadá dotaz nebo technický problém se svým chytrým zařízením. Požadavek si převezme konkrétní digitální asistent poblíž bydliště seniora a problém vyřeší buď online, nebo se domluví na osobní schůzce.

Web Moudré Sítě - https://moudra-sit.vercel.app/. V rámci něj senioři pokládají dotazy ve formuláři, mohou se zaregistrovat a přihlásit se do svého osobního profilu. 

Statická část webu běží na https://moudrasit.cz/, který je vytvořen ve [WordPressu](https://cs.wordpress.org/) za použití [Divi](https://www.elegantthemes.com/gallery/divi/) frameworku.

## Technologie

Web je napsaný ve frameworku [Next.js](https://nextjs.org/) a [TypeScriptu](https://www.typescriptlang.org/) s využitím komponent knihovny [MUI](https://mui.com/). Výsledek aktuálně běží na [Vercelu](https://vercel.com/).

Jako databázový model využíváme [Tabidoo](https://app.tabidoo.cloud/), z něhož pomocí API čteme a zapisujeme data.

Pro vytvoření a validaci formulářů využíváme [Formik](https://formik.org/) v kombinaci s [Yup](https://www.npmjs.com/package/yup), pro ochranu formulářů [reCAPTCHA](https://www.google.com/recaptcha/about/), pro autentifikaci knihovnu [Next Auth](https://next-auth.js.org/).

## Instalace 

```
git clone https://github.com/cesko-digital/moudra-sit.git
cd moudra-sit
npm install
npm run dev
```
