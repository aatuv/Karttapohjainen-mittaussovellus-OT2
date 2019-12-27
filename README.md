Karttapohjainen mittaussovellus (deployable version)
===

Ohjelmistotuotanto 2, ryhmä T

Ryhmän jäsenet:

Aatu Väisänen<br>
Aku Tuhkanen<br>
Kalle Pyykkönen<br>
Iiro Lievonen<br>
Veeti Raassina

Projektin käyttöliittymään (React-sovellus) ja palvelinkoodiin (node.js/express-sovellus) kontribuoineet henkilöt:
---

Aatu Väisänen
https://github.com/aatuv

React-sovelluksen lähdekoodi
---
https://github.com/aatuv/Karttamitta-OT2/tree/develop


Testaus
---
Sovelluksen kunnollista testausta ei ole vielä toteutettu.

Tiedossa olevat bugit: katso bugit- osio.

File List
---
```
.:
README.md
./api
./bin
./build
app.js
db.js
dbscript.txt
package-lock.json
package.json
```

Miten käynnistää palvelin
---
Palvelimen käynnistystä on testattu toistaiseksi vain Windows 10- käyttöjärjestelmällä.

Varmista, että tietokoneella on asennettuna node.js. Ohjeet tähän löytyvät verkosta.

Kun olet ladannut projektikansion tietokoneellesi, noudata seuraavia ohjeita:
---

1. Avaa komentokehote
2. Navigoi projektikansioon
3. Projektikansiossa, suorita seuraava komento: `npm install`
4. Odota, että komento päättyy. Nyt projektikansioon on asennettu vaadittavat kirjastot (määritelty `package.json`- tiedostossa)
5. Käynnistä palvelin komennolla `node ./bin/www.js`
6. Avaa verkkoselain, ja mene osoitteeseen localhost:3001
(**HUOM! kehitys on toteutettu käyttämällä Firefox-selainta, muiden selainten yhteensopivuudesta ei ole täyttä varmuutta!**)
7. Sovellus on käyttövalmis.


Bugit
---

Tiedossa on ainakin bugi, jossa anturien vetäminen uuteen sijaintiin ei toteudu halutulla tavalla (sijainti päivittyy ruudulla n. 2cm alemmas, mitä pitäisi). 
Kyseinen bugi tosin on vain react-sovelluksen deploy-versiossa, kehitysversiossa toiminto toimii halutusti.

Karttapohjainen mittaussovellus
---

* Sovelluksen tarkoituksena on toimia alustana, jolla pystytään seuraamaan Raspberry Pi:n (tai muun antureiden mittausdataa vastaanottavan tietokoneen) tietokantaan lähettämää mittausdataa.


* Sovellukseen pystyy lisäämään kuvatiedostoja (tarkoituksena siis, että kuvatiedostot ovat huonekarttoja/pohjapiirrustuksia), joiden päälle pystyy vetämään tietokannasta 
löytyviä antureita kuvastavia palloja niille paikoille, joihin anturit on tosielämässä asentanut. Nämä paikkatiedot tallentuvat tietokantaan käyttäjän liikutellessa palloja kartalla.

* Käyttäjä voi valita haluamansa anturin alasvetovalikosta, jolloin kyseisen anturin lähettämä mittausdata (projektissa lämpötila, ilmanpaine, ilmankosteus) näkyy taulussa, sekä visualisoituna graafeina.

* Projektissa antureina toimivat avoimeen lähdekoodiin pohjautuvat Ruuvitag-nimiset sensorit (https://ruuvi.com/).

* Projektin tietokanta on Azure-pohjainen SQL Server- tietokanta.


*Kirjoittanut Aatu Väisänen 17/04/2019*
