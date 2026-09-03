# Registrace DA - zadání

Source: `~/Downloads/Registrace_DA_zadani.pdf` (5 pages)
Extracted: 2026-05-26 (Europe/Prague), via `pdftotext -layout` + visual verification against `pdftoppm` page renders
Format: faithful transcript, Czech preserved, no interpretation

---

## Registrace digitálních asistentů

### Obsah kroků

- Datový základ a nové stavy
- Registrace přes webový formulář
- Rezervace úvodního callu
- Informace ke smlouvě
- Podpis smlouvy
- Výpis z rejstříku trestů
- Registrace do KoDo
- Proškolení
- Discord

---

## Datový základ a nové stavy

Pro řízení registrace používat multi-choice pole **Administrativní náležitosti** na záznamu digitálního asistenta. Hodnota v multi-choice je string array.

> Ověření proti Tabidoo: v PROD existuje pole `uzivatel.administrativniNalezitosti` typu **checklist** bez definovaných položek. Vedle něj existuje starší `uzivatel.administrativa` typu **dropdownmulti** se starými hodnotami. Pro nové zadání je potřeba doplnit níže uvedené hodnoty do pole Administrativní náležitosti nebo technicky sjednotit typ pole tak, aby fungovalo jako multi-choice pole stringů.

### Hodnoty multi-choice (v pořadí životního cyklu)

| Pořadí | Nová hodnota multi-choice |
|---|---|
| 1 | Rezervován termín úvodního callu |
| 2 | Úvodní call proběhl |
| 3 | Dodány informace ke smlouvě |
| 4 | Smlouva vytvořena |
| 5 | Smlouva podepsána |
| 6 | Nahrán výpis z rejstříku trestů |
| 7 | Výpis z rejstříku trestů schválen |
| 8 | Registrace KoDo potvrzena |
| 9 | Proškolení potvrzeno |
| 10 | Discord údaje dodány |
| 11 | Discord přístup přidělen |

### Tabulky a pole použité v procesu

| Hezký název | Interní název | Typ | Poznámka |
|---|---|---|---|
| Lidé (Digitální asistenti) | `uzivatel` | tabulka | Hlavní záznam DA. |
| Administrativní náležitosti | `administrativniNalezitosti` | checklist / multi-choice | Nově používané pole pro stavy registrace. |
| Administrativa | `administrativa` | dropdownmulti | Starší pole se stávajícími hodnotami; nepoužívat pro nové stavy, pokud se nerozhodne jinak. |
| Termíny schůzek | `terminy` | tabulka | Zdroj termínů informačního callu. |
| Rezervace | `rezervace` | tabulka | Zápis rezervace účastníka na termín. |
| Města a obce ČR | `mestaaobcecr` | tabulka | Číselník měst; unikátní zkratka je pole `zkratka`. |

---

## Registrace přes webový formulář

DA vyplní veřejný formulář na webu Moudré sítě a založí se nový záznam v Tabidoo. Tento krok zpřístupní aplikaci a navazující registrační formulář. DA zde vidí jen základní vstupní údaje a po založení může pokračovat na výběr callu.

| Pravidlo | Stavy / zápis |
|---|---|
| Odemčeno když | Veřejný formulář je dostupný bez stavu. |
| Dokončeno když | Záznam DA existuje v `uzivatel` a má roli Digitální asistent. |
| Po akci zapsat | Nový stav do `administrativniNalezitosti` se v tomto kroku nezapisuje. |

### Pole formuláře

| Tabulka | Field | Interní název | Typ | Zápis / poznámka |
|---|---|---|---|---|
| `uzivatel` | Jméno | `jmeno` | text | Povinné. |
| `uzivatel` | Příjmení | `prijmeni` | text | Povinné. |
| `uzivatel` | Email | `email` | text | Povinné, ideálně unikátní login. |
| `uzivatel` | Datum narození | `denNarozeni` | date | Povinné; formát ISO datum. |
| `uzivatel` | Město | `mesto` | text | Dnes text / zkratka města. |
| `uzivatel` | `mestoZkratka` | `mestoZkratka` | text | Zkratka z číselníku měst. |
| `MestaAObceCR` | `zkratka` | `zkratka` | text | Unikátní klíč města pro párování. |
| `uzivatel` | Bydliště | `trvaleBydliste` | schema_link | Doporučeno zapisovat rovnou link na `MestaAObceCR`. |
| `uzivatel` | Ulice a číslo popisné | `ulice` | text | Povinné. |
| `uzivatel` | Telefon | `telefon` | text | Včetně předvolby, bez mezer. |
| `uzivatel` | Heslo | `heslo` | text | |
| `uzivatel` | Role v týmu | `role` | dropdownmulti | Nastavit Digitální asistent. |

> Zvážit zda z registračního formuláře vypustit **Jsem členem DofE** a **Jsem členem organizace / školy**. Členství DofE se doplní až v kroku Informace ke smlouvě. U města je vhodné formulář aktualizovat tak, aby načítal číselník Města a obce ČR a zapisoval rovnou link, pokud to tak už není.

---

## Rezervace úvodního callu

DA si vybere volný budoucí termín úvodního představení projektu. Po výběru založit nový záznam rezervace do Tabidoo a DA vidí vybraný termín, lektora a Google Meet link. Další sekce se odemknou až po ručním potvrzení účasti koordinátorem v Tabidoo.

| Pravidlo | Stavy / zápis |
|---|---|
| Odemčeno když | Záznam DA existuje; další stav se pro zobrazení termínů nevyžaduje. |
| Dokončeno když | Pro rezervaci: `administrativniNalezitosti` obsahuje **Rezervován termín úvodního callu**. Pro odemčení dalších kroků: obsahuje **Úvodní call proběhl**. |
| Po akci zapsat | Po vytvoření rezervace přidat **Rezervován termín úvodního callu**. Koordinátor po callu ručně přidá **Úvodní call proběhl**. |

### Pole termínů a rezervace

| Tabulka | Field | Interní název | Typ | Zápis / filtr |
|---|---|---|---|---|
| `terminy` | Stav události | `stavUdalosti` | dropdown | Filtrovat **Probíhá přihlašování**. |
| `terminy` | Typ události | `typUdalosti` | dropdown | Filtrovat **Úvodní představení projektu**. |
| `terminy` | Datum konání | `datumKonani` | datetime | Filtrovat `>= dnes`; zobrazit datum a čas. |
| `terminy` | Doba trvání (min) | `dobaTrvaniMin` | decimal | Spočítat čas od-do. |
| `terminy` | Obsazenost | `obsazenost` | calculated | Filtrovat **Volná místa**. |
| `terminy` | Maximální počet účastníků | `maximalniPocetUcastniku` | decimal | Použít pro kontrolu kapacity. |
| `terminy` | Počet přihlášených účastníků | `pocetPrihlasenychUcastniku` | calculated | Použít pro kontrolu kapacity. |
| `terminy` | Lektor | `lektor` | schema_link | Zobrazit jméno a příjmení. |
| `terminy` | Google Meet Link | `googleMeetLink` | url_link | Zobrazit až po rezervaci. |
| `rezervace` | Vyberte termín | `vyberteTermin` | schema_link | Link na vybraný záznam `terminy`. |
| `rezervace` | Účastník | `ucastnik` | schema_link | Link na DA v `uzivatel`. |
| `rezervace` | Jméno / Příjmení / Email | `jmeno` / `prijmeni` / `email` | text | Opsat ze záznamu DA. |
| `rezervace` | Účast | `ucast` | dropdown | Zapsat **Platná rezervace**. |

---

## Informace ke smlouvě

DA doplní a zkontroluje údaje potřebné pro dobrovolnickou smlouvu. Formulář předvyplní známé osobní údaje; u osob mladších 18 let zobrazí a vyžaduje údaje zákonného zástupce. Po uložení se čeká na kontrolu koordinátora a vytvoření smlouvy.

| Pravidlo | Stavy / zápis |
|---|---|
| Odemčeno když | `administrativniNalezitosti` obsahuje **Úvodní call proběhl**. |
| Dokončeno když | `administrativniNalezitosti` obsahuje **Dodány informace ke smlouvě**. |
| Po akci zapsat | Po kliknutí Uložit přidat **Dodány informace ke smlouvě**. |

### Pole formuláře

| Tabulka | Field | Interní název | Typ | Povinnost / formát |
|---|---|---|---|---|
| `uzivatel` | Jméno | `jmeno` | text | Povinné, předvyplnit. |
| `uzivatel` | Příjmení | `prijmeni` | text | Povinné, předvyplnit. |
| `uzivatel` | Email | `email` | text | Povinné, předvyplnit. |
| `uzivatel` | Datum narození | `denNarozeni` | date | Povinné; podle věku rozhodnout zástupce. |
| `uzivatel` | Ulice a číslo popisné | `ulice` | text | Povinné. |
| `uzivatel` | Bydliště | `trvaleBydliste` | schema_link | Povinný link na `MestaAObceCR`. |
| `uzivatel` | Hlavní místo působení | `hlavniMistoPusobeni` | schema_link | Povinné pro notifikace a mapu. |
| `uzivatel` | Telefon | `telefon` | text | Povinné. |
| `uzivatel` | Jsem členem DofE | `jsemClenemDofE` | checkbox | ano/ne. |
| `uzivatel` | Jméno zákonný zástupce | `jmenoZakonnyZastupce` | text | Povinné jen < 18 let. |
| `uzivatel` | Příjmení zákonný zástupce | `prijmeniZakonnyZastupce` | text | Povinné jen < 18 let. |
| `uzivatel` | Email zákonný zástupce | `emailZakonnyZastupce` | text | Povinné jen < 18 let. |
| `uzivatel` | Telefon zákonný zástupce | `telefonZakonnyZastupce` | text | jen < 18 let. |

---

## Podpis smlouvy

Tento krok se DA zobrazí až po vytvoření smlouvy koordinátorem. Aplikace ukáže URL pro online podpis, ale podpis samotný nepotvrzuje automaticky. Dokončení ručně potvrdí koordinátor v Tabidoo.

| Pravidlo | Stavy / zápis |
|---|---|
| Odemčeno když | `administrativniNalezitosti` obsahuje **Smlouva vytvořena**. |
| Dokončeno když | `administrativniNalezitosti` obsahuje **Smlouva podepsána**. |
| Po akci zapsat | Web zde nepřidává stav automaticky; koordinátor přidá **Smlouva vytvořena** a později **Smlouva podepsána**. |

### Pole

| Tabulka | Field | Interní název | Typ | Zápis / poznámka |
|---|---|---|---|---|
| `uzivatel` | Link pro online podpis smlouvy | `onlinePodpisSmlouvyLink` | url_link | Koordinátor vyplní ručně při vytvoření smlouvy. |
| `uzivatel` | Datum podpisu smlouvy | `datumPodpisuSmlouvy` | date | Koordinátor vyplní ručně po potvrzení podpisu. |

---

## Výpis z rejstříku trestů

DA nahraje soubor s výpisem z rejstříku trestů. Po nahrání vidí stav **čeká se na kontrolu**. Krok je dokončený až po ručním schválení koordinátorem.

| Pravidlo | Stavy / zápis |
|---|---|
| Odemčeno když | `administrativniNalezitosti` obsahuje **Úvodní call proběhl**. |
| Dokončeno když | `administrativniNalezitosti` obsahuje **Výpis z rejstříku trestů schválen**. |
| Po akci zapsat | Po uploadu přidat **Nahrán výpis z rejstříku trestů**. Koordinátor po kontrole přidá **Výpis z rejstříku trestů schválen**. |

### Pole

| Tabulka | Field | Interní název | Typ | Zápis / poznámka |
|---|---|---|---|---|
| `uzivatel` | Výpis z rejstříku trestů | `vypisZRejstrikuTrestu` | file | Nahrát soubor přímo na záznam DA. |
| `uzivatel` | Administrativní náležitosti | `administrativniNalezitosti` | multi-choice | Doplnit stavy uploadu a schválení. |

---

## Registrace do KoDo

Aplikace zobrazí odkaz na externí registrační formulář KoDo. Front-end zde nic automaticky nepotvrzuje; čeká se na kontrolu koordinátora. Po potvrzení se sekce označí jako dokončená.

| Pravidlo | Stavy / zápis |
|---|---|
| Odemčeno když | `administrativniNalezitosti` obsahuje **Úvodní call proběhl**. |
| Dokončeno když | `administrativniNalezitosti` obsahuje **Registrace KoDo potvrzena**. |
| Po akci zapsat | Koordinátor po kontrole přidá **Registrace KoDo potvrzena**. |

### Pole

| Prvek | Hodnota / field | Typ | Poznámka |
|---|---|---|---|
| Odkaz ve front-endu | `https://www.totem-koda.cz/prezentace-prihlaseni` | URL | Statický odkaz, není nutné ukládat do Tabidoo. |
| Stav dokončení | `administrativniNalezitosti: Registrace KoDo potvrzena` | multi-choice | Ruční potvrzení koordinátorem. |

---

## Proškolení

DA vidí sadu odkazů na videa a dokumenty ke školení. Po prostudování klikne na potvrzovací tlačítko, které funguje jako čestné prohlášení. Koordinátor tento krok nemusí kontrolovat.

| Pravidlo | Stavy / zápis |
|---|---|
| Odemčeno když | `administrativniNalezitosti` obsahuje **Úvodní call proběhl**. |
| Dokončeno když | `administrativniNalezitosti` obsahuje **Proškolení potvrzeno**. |
| Po akci zapsat | Po potvrzení DA přidat **Proškolení potvrzeno**. |

### Pole

| Prvek | Field / hodnota | Typ | Poznámka |
|---|---|---|---|
| Seznam školících odkazů | Konfigurace front-endu | URL list | V Tabidoo není samostatná tabulka pro jednotlivé odkazy. |
| Potvrzení proškolení | `administrativniNalezitosti: Proškolení potvrzeno` | multi-choice | Zapisuje front-end po kliknutí. |

---

## Discord

DA zadá své Discord uživatelské jméno a uloží ho do Tabidoo. Tím vznikne stav **čeká se na přidělení přístupu**. Krok je dokončený až po ručním potvrzení koordinátorem, že DA má přístup do Discordu.

| Pravidlo | Stavy / zápis |
|---|---|
| Odemčeno když | `administrativniNalezitosti` obsahuje **Úvodní call proběhl**. |
| Dokončeno když | `administrativniNalezitosti` obsahuje **Discord údaje dodány** i **Discord přístup přidělen**. |
| Po akci zapsat | Po uložení jména přidat **Discord údaje dodány**. Koordinátor po přidělení přístupu přidá **Discord přístup přidělen**. |

### Pole

| Tabulka | Field | Interní název | Typ | Zápis / poznámka |
|---|---|---|---|---|
| `uzivatel` | Discord uživatelské jméno | `discordUzivatelskeJmeno` | text | zadává DA. |
| `uzivatel` | Discord uživatelské ID | `discordUzivatelskeId` | text | Zatím nepoužívat - pro budoucí automatizaci. |
| `uzivatel` | Administrativní náležitosti | `administrativniNalezitosti` | multi-choice | Dva stavy: údaje dodány a přístup přidělen. |
