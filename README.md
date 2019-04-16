Karttapohjaisen mittaussovelluksen käyttöliittymä
===

Ohjelmistotuotanto 2 (kevät 2019), Ryhmä T
---

Projektin käyttöliittymään (React-sovellus) kontribuoineet henkilöt:
---

* Aatu Väisänen (https://github.com/aatuv)

Testaus
---

Sovelluksen kunnollista testausta ei ole vielä toteutettu.

- Tiedossa olevat bugit: katso bugit-osio.

Tiedostot
---
```
.:
README.md
./functions
./public
./src
firebase.json
package-lock.json
package.json
```

**Miten käynnistää sovellus**
---
Palvelimen käynnistystä on testattu toistaiseksi vain Windows 10- käyttöjärjestelmällä.

Kun olet ladannut projektikansion tietokoneellesi, noudata seuraavia ohjeita:
---

1. Avaa komentokehote
2. Navigoi projektikansioon
3. Projektikansiossa, suorita seuraava komento: `npm install`
4. Odota, että komento päättyy. Nyt projektikansioon on asennettu vaadittavat kirjastot (määritelty `package.json`- tiedostossa kohdassa "dependencies")
5. Käynnistä palvelin komennolla `npm start`
6. Odota hetki, kehitysnäkymä avautuu tietokoneen oletusselaimessa osoitteessa localhost:3000
(**HUOM! kehitys on toteutettu käyttämällä Firefox-selainta, muiden selainten yhteensopivuudesta ei ole täyttä varmuutta!**)
7. Sovellus on käyttövalmis.


Bugit
---

Tiedossa on ainakin bugi, jossa **DEPLOYMENT-VERSIOSSA** anturien vetäminen uuteen sijaintiin ei toteudu halutulla tavalla (sijainti päivittyy ruudulla n. 2cm alemmas, mitä pitäisi). 
Kyseinen bugi tosin on vain react-sovelluksen deploy-versiossa, tässä kehitysversiossa toiminto toimii jotakuinkin halutusti.

Karttapohjainen mittaussovellus
---

* Sovelluksen tarkoituksena on toimia alustana, jolla pystytään seuraamaan Raspberry Pi:n (tai muun antureiden mittausdataa vastaanottavan tietokoneen) tietokantaan lähettämää mittausdataa.


* Sovellukseen pystyy lisäämään kuvatiedostoja (tarkoituksena siis, että kuvatiedostot ovat huonekarttoja/pohjapiirrustuksia), joiden päälle pystyy vetämään tietokannasta 
löytyviä antureita kuvastavia palloja niille paikoille, joihin anturit on tosielämässä asentanut. Nämä paikkatiedot tallentuvat tietokantaan käyttäjän liikutellessa palloja kartalla.

* Käyttäjä voi valita haluamansa anturin alasvetovalikosta, jolloin kyseisen anturin lähettämä mittausdata (projektissa lämpötila, ilmanpaine, ilmankosteus) näkyy taulussa, sekä visualisoituna graafeina.

* Projektissa antureina toimivat avoimeen lähdekoodiin pohjautuvat Ruuvitag-nimiset sensorit (https://ruuvi.com/).

* Projektin tietokanta on Azure-pohjainen SQL Server- tietokanta.


*Kirjoittanut Aatu Väisänen 17/04/2019*

React App
---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify