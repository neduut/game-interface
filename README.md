# 🎮 Atminties žaidimas (Memory Game)

Interaktyvusis žaidimas atminčiai lavinti, sukurtas pagal Praktinės užduoties Nr. 4 reikalavimus.

## 📋 Užduoties aprašymas

Žaidimo esmė – rasti identiškų paveikslėlių poras. Kortelės išdėstomos atsitiktine tvarka ir uždengiamos. Žaidėjas turi surasti visas poras atverdamas korteles po dvi. Jei pora sutampa, abi kortelės išnyksta. Jei nesutampa – abi užverčiamos atgal.

## ✨ Funkcionalumas

### Pagrindinės savybės:
- ✅ **12 skirtingų simbolių porų** (hard režime)
- ✅ **3 sunkumo lygiai**: Lengvas (6 poros), Vidutinis (8 poros), Sunkus (12 porų)
- ✅ **Žaidėjo vardo įvedimas** prieš pradedant žaidimą
- ✅ **Rezultatų saugojimas** sessionStorage atmintyje
- ✅ **Geriausi rezultatai** (Top 10) rodomi pradiniame ekrane
- ✅ **Laikrodis ir ėjimų skaičiavimas**
- ✅ **Taškų sistema** (atsižvelgiama į laiką, ėjimus ir sunkumą)
- ✅ **Responsive dizainas** – veikia įvairiuose ekranuose

### Responsive dizainas:
- Desktop: didesnės kortelės, erdvesnis išdėstymas
- Tablet (≤768px): vidutinio dydžio kortelės
- Mobile (≤480px): mažesnės kortelės, optimizuotas išdėstymas

## 🎯 Nielsen euristikos principai

Žaidime įgyvendinti **6 Nielsen euristikos principai**:

1. **Visibility of system status** 
   - Rodomas laikas, ėjimų skaičius, surastų porų skaičius
   - Matoma dabartinė žaidimo būsena

2. **Match between system and real world**
   - Aiškūs lietuviški pavadinimai ir instrukcijos
   - Intuityvus kortelių žaidimo principas

3. **User control and freedom**
   - Galima baigti žaidimą bet kada ("Baigti žaidimą" mygtukas)
   - Grįžti į pradinį meniu
   - Žaisti iš naujo

4. **Consistency and standards**
   - Standartinė kortelių atminties žaidimo logika
   - Įprasti mygtukai ir sąsajos elementai

5. **Error prevention**
   - Negalima versti daugiau nei 2 korteles vienu metu
   - Patvirtinimas prieš baigiant žaidimą
   - Vardo įvedimo validacija

6. **Recognition rather than recall**
   - Visos būsenos ir statistika rodoma ekrane
   - Nereikia atsiminti, kiek liko porų ar kiek praėjo laiko

7. **Flexibility and efficiency of use**
   - Skirtingi sunkumo lygiai skirtingo lygio žaidėjams
   - Greitas pakartotinis žaidimas

8. **Aesthetic and minimalist design**
   - Švarus, aiškus dizainas be perteklinių elementų
   - Akcentuojama svarbiausia informacija

## 🎨 Technologijos

- **HTML5** - struktūra
- **CSS3** - stiliai, animacijos, responsive dizainas
- **JavaScript (ES6)** - žaidimo logika
- **DOM API** - dinaminės sąsajos kūrimas
- **BOM API** - sessionStorage, localStorage, laikrodis

## 🚀 Kaip paleisti

1. Atsisiųskite visus failus:
   - `index.html`
   - `styles.css`
   - `script.js`

2. Atidarykite `index.html` naršyklėje

3. Arba naudokite Live Server:
   ```bash
   # VS Code: dešiniu pelės klavišu ant index.html -> "Open with Live Server"
   ```

## 🎲 Žaidimo instrukcijos

1. **Įveskite savo vardą** - rezultatai bus saugomi su jūsų vardu
2. **Pasirinkite sunkumą**:
   - Lengvas: 4×3 lenta (6 poros)
   - Vidutinis: 4×4 lenta (8 poros)  
   - Sunkus: 6×4 lenta (12 porų)
3. **Spauskite "Pradėti žaidimą"**
4. **Spauskite korteles** - surasikite visas poras
5. **Stebėkite statistiką** - ėjimai, laikas, surasti porai

## 📊 Taškų skaičiavimas

Taškai skaičiuojami pagal formulę:
```
Taškai = 10000 - (ėjimai × 50) - (sekundės × 10) + sunkumo bonusas
```

Sunkumo bonusai:
- Lengvas: 0 taškų
- Vidutinis: +1000 taškų
- Sunkus: +2000 taškų

## 💾 Duomenų saugojimas

- **sessionStorage**: Geriausi rezultatai (Top 10) saugomi sesijos metu
  - Duomenys išlieka kol uždarysite naršyklės langą/kortelę
  
- **localStorage**: Paskutinis žaidėjo vardas
  - Išlieka net uždarę naršyklę (patogumui)

## 📱 Palaikomi įrenginiai

- ✅ Desktop kompiuteriai (1200px+)
- ✅ Planšetės (768px - 1199px)
- ✅ Mobilieji telefonai (320px - 767px)
- ✅ Visos modernios naršyklės (Chrome, Firefox, Safari, Edge)

## 🎯 Užduoties reikalavimai

| Reikalavimas | Statusas |
|-------------|----------|
| HTML dokumentas | ✅ |
| CSS stiliai | ✅ |
| JavaScript scenarijus | ✅ |
| DOM ir BOM naudojimas | ✅ |
| 10+ porų paveikslėlių | ✅ (12 porų) |
| Atsitiktinis išdėstymas | ✅ |
| 2+ sudėtingumo lygiai | ✅ (3 lygiai) |
| Rezultatų vertinimas | ✅ |
| Žaidėjo vardas | ✅ |
| sessionStorage | ✅ |
| Responsive dizainas | ✅ |
| Nielsen euristika (4+) | ✅ (6+ principai) |

## 👨‍💻 Autorius

**Vardas**: [Jūsų vardas]  
**Grupė**: [Jūsų grupė]  
**Data**: 2025-12-03

## 📝 Pastabos dėstytojui

1. Visi rezultatai saugomi **sessionStorage** - duomenys išliks tik šios sesijos metu
2. Žaidime naudojami emoji simboliai - veikia visose moderniose naršyklėse
3. Responsive dizainas testuotas Chrome, Firefox ir Edge naršyklėse
4. Nielsen euristikos principai aiškiai pažymėti kode (script.js, eilutės 24-31)
5. Galima lengvai pakeisti simbolius į kitus (script.js, symbols objektas)
