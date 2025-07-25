//fetchData();
let pokeData;
let evolData;


function popupForm(){
    document.getElementById("myPopUP").style.visibility = "visible";
}

function closePopupForm(){
    document.getElementById("myPopUP").style.visibility = "hidden";
}

function loginPopUpForm(){
    document.getElementById("myLogin").style.visibility = "visible";
}

function closePopupLoginForm(){
    document.getElementById("myLogin").style.visibility = "hidden";
}




function clear2(){
    const img = document.getElementById("pokemonSprite");
    img.style.visibility = "hidden";
    const box = document.getElementById("txtBox");
    const box2 = document.getElementById("txtBox2");
    const typingBox = document.getElementById("pokeName");
    const evolBox = document.querySelector('.evolutionBox');
    const namesBox = document.querySelector(".namesBox");
    const audio = document.getElementById("audioFile");
    const evolBoxDetails = document.querySelector(".evolBox");
    console.log(audio.disabled);
    
    box.innerHTML = "";
    box2.innerHTML = "";
    typingBox.value = "";
    evolBox.innerHTML = '';
    namesBox.innerHTML = '';
    evolBoxDetails.innerHTML = "";
    // audio.disabled = true;


    //alert('Hey');
}

function defaultButton(pokeData){
    try{

        if(!pokeData){
            throw new Error("Pokemon doesn't exist");
        }
        // const defRear = pokeData.sprites.back_default;
        const pokemonAnmSpirite = pokeData.sprites.versions['generation-v']['black-white'].animated.front_default;

        const img = document.getElementById("pokemonSprite");

        // img.src = defRear;
        img.src = pokemonAnmSpirite

        console.log(pokeData);
    }

    catch(error){
        console.error(error);
    }
}

async function sendDataUser(){
    let emailUser = document.getElementById('emaUser');
    let passUser = document.getElementById('pssUser');

    // let emailContent = emailUser.value;
    // let passContent = passUser.value;

    // console.log(emailContent);
    // console.log(passContent);

    // const sendPackage = [];
    // sendPackage.push(emailContent);
    // sendPackage.push(passContent);

    // let obj = {"email": sendPackage[0],
    //     "password": sendPackage[1],
    // };

    let obj = JSON.stringify({"email": emailUser.value, "password": passUser.value});
    console.log(obj);

    // console.log(sendPackage);

    const response = await fetch('http://localhost:3000/send', {
        method: "POST",
        body: obj,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        }
    );   
    const info = await response.text();
    alert(info);

    emailUser.value = '';
    passUser.value = '';


    // const resp = await fetch('http://localhost:3000/');
    // const inf = await resp.json();
    // alert(inf);
    
}


async function loginDataUser(){

    let emailUser = document.getElementById('ema');
    let passUser = document.getElementById('pss');
    let userLoginName = document.getElementById('personalName');


    // console.log(emailUser.value);
    // console.log(passUser.value);

    let obj = JSON.stringify({"email": emailUser.value, "password": passUser.value});

    console.log(obj);

    const loginInfo = await fetch('http://localhost:3000/login', {
        method: "POST",
        body: obj,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    // const resLoginInfo = await loginInfo.json();

    // console.log(resLoginInfo);

    emailUser.value = '';
    passUser.value = '';

    const infoSent = await loginInfo.json();
    userLoginName.textContent = infoSent.email;

    alert(infoSent.email + ", welcome to our system");

}


async function fetchData() {

    try{

        const back = document.getElementById("back");

        // const respons = await fetch('http://localhost:3000/');

        // const info = await respons.text();

        // alert(info);
            

        const pokemonName = document.getElementById("pokeName").value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`); 

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        
        const data = await response.json();

        pokeData = data;

        // data is the main piece
        console.log(pokeData);

        // backDefault(data);
        // frontShiny(data);
        // backShiny(data);

        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`);
        const speciesData = await speciesResponse.json();

        evolData = speciesData;

        console.log(speciesData);

        showDexEntry(pokeData,speciesData);

        const pokemonSprite = pokeData.sprites.front_default; 

        const pokemonAnmSpirite = pokeData.sprites.versions['generation-v']['black-white'].animated.front_default;
        // const pokemonSprite2 = data.sprites.front_shiny;
        // const dscrpItem = data.stats;
        const img = document.getElementById("pokemonSprite");
       // const img2 = document.getElementById("pokemonSprite2");
        // const dscrp = document.getElementById("dscp");
        // dscrp.src = dscrpItem;
        
        // img.src = pokemonSprite;
        img.src = pokemonAnmSpirite
        img.style.visibility = "visible";
        img.style.display = "block";

        showStats(pokeData.stats);

        //play pokemon cry when it loads
        const pokemonID = pokeData.id;
        const audio = new Audio();
        audio.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonID}.ogg`;
        audio.play();

        evolutionStats(evolData);

        //img2.src = pokemonSprite2;
       // img2.style.display = "block";

        // console.log(data);

        // document.querySelector('button[onclick="playAudio"]').disabled = false;

    }
    catch(error){

        const pokemonName = document.getElementById("pokeName").value.toLowerCase();

        const message = `${pokemonName} , this pokemon doesn't exist in this database`

        showError(message);
        // console.error(error);
    }
}


async function evolutionStats(evolData){
    try{

        const consoleBox = document.querySelector('.evolutionBox');

        consoleBox.innerHTML = '';

        let speciesEvol =  await fetch (evolData.evolution_chain['url']);
        let speciesEvolDetails = await (speciesEvol.json());
        console.log(speciesEvolDetails);
        console.log("check below");
        console.log(speciesEvolDetails.chain.evolves_to);

        // consoleBox.style.display = 'inline-block';


        // let testVariable = true;
        // let evolCheck = speciesEvolDetails.chain.evolves_to[0].species.name;
        let baseName = speciesEvolDetails.chain.species.name;
        console.log(baseName);

        //evolution type
        const evolType = [];

        // console.log(speciesEvolDetails.chain.evolves_to[0]);
        let o = speciesEvolDetails.chain.evolves_to;
        // console.log(o);
        // console.log(o[0].evolves_to);
        // console.log(o[0].evolves_to.length);
        // console.log(o[0].evolves_to[0].evolves_to);
        // console.log(speciesEvolDetails.chain.evolves_to[0].evolves_to[0]);

        // protType(o);

        function protType(o){
            for(const i in o){
                if(!!o[i].evolves_to){
                    console.log("done");
                    protType(o[i].evolves_to);
                }
            }
        }


        addEvolTypes(evolType,speciesEvolDetails.chain.evolves_to);

        function addEvolTypes(evolType, speciesEvolDetails){
            // const i = 0;
            let v = 0;
            for(const prop in speciesEvolDetails){
                // console.log(prop); // 0 value
                // console.log(speciesEvolDetails[prop]);
                // console.log(speciesEvolDetails[prop].evolves_to); // next stage 
                // console.log(speciesEvolDetails.evolution_details[prop]); // details to extract
                // console.log(speciesEvolDetails[0].evolves_to.length); // check to call the next one
                if(!!speciesEvolDetails[0].evolves_to){
                    const pokeD = speciesEvolDetails[prop].evolution_details[prop];
                    for(const i in pokeD){
                        // console.log(i); // name 
                        // console.log(pokeD[i]); // value
                        // console.log(typeof pokeD[i]);
                        if(!!pokeD[i]){
                            if(i !== 'trigger'){
                                evolType.push(i);
                            }
                            if(typeof pokeD[i] === 'object'){
                                evolType.push(pokeD[i].name);
                            } else {
                                evolType.push(pokeD[i].toString());
                            }
                        }
                        // addEvolTypes(evolType, speciesEvolDetails[prop].evolves_to);
                    }
                    addEvolTypes(evolType, speciesEvolDetails[prop].evolves_to);
                }
            }
            // addEvolTypes(evolType, speciesEvolDetails[0]);
                // const pokeEvol = speciesEvolDetails[i].evolution_details[i]; 

                 // console.log(speciesEvolDetails[prop].evolution_details[prop]);
                    // pokeD = speciesEvolDetails[prop].evolution_details[prop];
                    // for(const i in pokeD){
                    //     console.log(i);
                    //     console.log(pokeD[i]);
                    //     if(!!pokeD[i]){
                    //         evolType.push(i);
                    //         if(typeof pokeD[i] === 'object'){
                    //             evolType.push(pokeD[i].name);
                    //         } else {
                    //             evolType.push(pokeD[i]);
                    //         }
                    //     }
                    // }

            // const pokeEvol = speciesEvolDetails[i].evolution_details[i];
            // // console.log(pokeEvol);
            // console.log(speciesEvolDetails.length > 0);
            // // const pokeEvol2 = speciesEvolDetails[i];
            // for(const prop in pokeEvol){
            //     // console.log(prop); // name 
            //     // console.log(pokeEvol[prop]); // value
            //     // console.log(typeof pokeEvol[prop]); //type
                
            //     if(!!pokeEvol[prop] && v < 18){
            //         evolType.push(prop);
            //         if(typeof pokeEvol[prop] === 'object'){
            //             // console.log(pokeEvol[prop].name);
            //             evolType.push(pokeEvol[prop].name);
            //         } else {
            //             evolType.push(pokeEvol[prop]);
            //             console.log(speciesEvolDetails[i]);
            //             // console.log(pokeEvol2[prop]);
            //             // addEvolTypes(evolType, speciesEvolDetails[i]);
            //         }
            //     } else {
            //         // addEvolTypes(evolType, speciesEvolDetails.chain.evolves_to[i]);
            //     }
            //     v++;
                
            // }
            // console.log(v);
            // for(const prop in speciesEvolDetails){
            //     const savePoint = speciesEvolDetails[prop];
            //     console.log(savePoint);
            //     for(const i in savePoint){
            //         console.log(i);
            //         console.log(savePoint[i]);
            //         if(!!savePoint[i] && savePoint.length > 0){
            //             evolType.push(i);
            //             if(i === 'trigger' || i === 'item'){
            //                 evolType.push(savePoint[i].name);
            //             } else {
            //                 evolType.push(savePoint[i]);
            //             }
            //         } else {
            //             break;
            //         }
            //     }
            //     // console.log(prop);
            //     // console.log(speciesEvolDetails[prop]);
            //     // console.log(speciesEvolDetails.prop);

            //     // // console.log(speciesEvolDetails[16]);
            //     // if(!!speciesEvolDetails[prop]){
            //     //     evolType.push(prop);
            //     //     if(prop === 'trigger' || prop === 'item'){
            //     //         evolType.push(speciesEvolDetails[prop].name);
            //     //     } else {
            //     //         evolType.push(speciesEvolDetails[prop]);
            //     //     }
                    
            //     //     console.log(speciesEvolDetails[prop]);
            //     // }
            //     // addEvolTypes(evolType, savePoint);
            //     console.log('done');
            // }
        }
        
        console.log(evolType);






        //two loops, store everything in an array
        //next loop print everything

        //store everything
        // i need to add the first evolves_to
        const evolCollection = [];
        evolCollection.push(baseName);

        addNames(evolCollection,speciesEvolDetails.chain.evolves_to);

        function addNames(evolCollection,speciesEvolDetails){
            for (const prop in speciesEvolDetails){
                console.log(prop);
                console.log(speciesEvolDetails[prop].evolves_to);
                if(!!prop && speciesEvolDetails.length > 0){
                    console.log(speciesEvolDetails[prop]);
                    console.log(speciesEvolDetails[prop].species.name);
                    evolCollection.push(speciesEvolDetails[prop].species.name);
                    console.log(speciesEvolDetails[prop].evolves_to)
                    addNames(evolCollection,speciesEvolDetails[prop].evolves_to);
                } else {
                    evolCollection.push(speciesEvolDetails[prop].species.name);
                    break;
                }


                // const value = speciesEvolDetails[prop];
                // console.log(value)
                // if(typeof value === 'object' && !!value){
                //     console.log(value);
                //     evolCollection.push(value.evolves_to[0].species.name);
                // }
            }
            // const value = speciesEvolDetails.chain.evolves_to[0];
            // console.log(value);
            // console.log(typeof value.species.name);
            // if(typeof value === 'object' && typeof value.species.name === 'string'){
            //     console.log(value);
            //     evolCollection.push(value.species.name);
            //     let speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${value.species.name}/`);
            //     let speciesData = await speciesResponse.json();
            //     console.log(speciesData);
            //     let speciesEvol =  await fetch (speciesData.evolution_chain['url']);
            //     let speciesEvolDetails = await (speciesEvol.json());
            //     addNames(evolCollection, speciesEvolDetails);
            // }
        }

        console.log(evolCollection);

        printImages(evolCollection);

        consoleBox.style.display = 'flex';
        consoleBox.style.flexShrink = '0';
        consoleBox.style.flexBasis = 'auto';
        consoleBox.style.height = 'auto';

        async function printImages(evolCollection){
            let arrayLength = evolCollection.length;
            if(evolCollection[0] === 'eevee'){
                arrayLength = arrayLength - 1;
            }
            console.log(arrayLength);
            for(let i = 0; i < arrayLength; i++){
                
                const img = document.createElement('img');
                img.style.width = '30vw';
                // img.style.maxHeight = '30%';
                img.style.height = '25vh';
                img.style.objectFit = 'contain';
                console.log(i);
                console.log(evolCollection[i]);
                let name = evolCollection[i];
                let baseUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                let baseStageDetails = await (baseUrl.json());
                let pokeAnmSprite = baseStageDetails.sprites.versions['generation-v']['black-white'].animated.front_default; 
                img.src = pokeAnmSprite;
                if(arrayLength === 1){
                    img.style.margin = "0 auto";
                }
                consoleBox.appendChild(img);
                
            }
        }


        printNames(evolCollection, evolType);


        function printNames(evolCollection, evolType){
            console.log(evolType);
            const arrayLength = evolCollection.length;
            const textBox = document.querySelector('.namesBox');
            var x = document.createElement("p");
            // var x = document.createTextNode("");
            textBox.innerHTML = '';
            for(let i = 0; i < arrayLength; i++){
                const nameBox = document.createElement("p");
                // const evolutionText = document.createElement("p");
                // const evolutionText2 = document.createElement("p");
                nameBox.textContent = evolCollection[i];
                // console.log(evolType.length);
                textBox.appendChild(nameBox);
                // evolutionText.textContent = evolType[i];
                // evolutionText2.textContent = evolType[i+1];
                // nameNode = document.createTextNode("  " + evolCollection[i] + "   ");
                // nameBox.src = evolCollection[i];
                // console.log(nameBox);
                // textBox.appendChild(nameNode);
                // textBox.appendChild(evolutionText);
                // textBox.appendChild(evolutionText2);
            }
            printEvolNames(evolType);
        }

        function printEvolNames(evolType){
            const textBox = document.querySelector('.evolBox');
            const removeWord = "[object HTMLParagraphElement]";
            var x = document.createElement("p");
            textBox.innerHTML = '';
            for(let m = 0; m < evolType.length; m++){
                let i = m + 1;
                console.log(evolType[m]);
                x += evolType[m] + " ";
                console.log(x);
                if(i % 3 === 0){
                    const x2 = document.createElement("p");
                    if(x.includes(removeWord)){
                        x = x.replace('[object HTMLParagraphElement]','');
                        x2.textContent = x;
                    } else {
                        x2.textContent = x;
                    }
                    textBox.appendChild(x2);
                    x = '';
                }
            }
        }


        // while(evolCheck.length > 0){
        // }
        // console.log(evolCheck);
        // console.log(baseName);
        // let o = 1;
        // let h = o + 1;
        // // evolCheck.length > 0;
        // while(o <= 3){
        //     let baseUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${baseName}`);
        //     let baseStageDetails = await (baseUrl.json());
        //     console.log(baseStageDetails);
        //     let pokemonAnmSpirite = baseStageDetails.sprites.versions['generation-v']['black-white'].animated.front_default;
        //     img.src = pokemonAnmSpirite;
        //     console.log(img); //bug found
        //     consoleBox.appendChild(img);
        //     let speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${baseName}/`);
        //     let speciesData = await speciesResponse.json();
        //     speciesEvol =  await fetch (speciesData.evolution_chain['url']);
        //     speciesEvolDetails = await (speciesEvol.json());
        //     console.log("here");
        //     console.log(speciesEvolDetails);
        //     const evolNum = "evolves_to[0]";

        //     const defaultName = "speciesEvolDetails.chain";
        //     let finalName = defaultName + "." + Array(o).fill(evolNum).join(".") + ".species.name";

        //     // evolCheck = speciesEvolDetails.chain.evolves_to[0].species.name; //bug found
        //     evolCheck = finalName;
        //     console.log(evolCheck);
        //     baseName = evolCheck;
        //     console.log(baseName);
        //     o++;
        // }

        
        // const baseName = speciesEvolDetails.chain.species.name;
        // const baseUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${baseName}`);
        // const baseStageDetails = await (baseUrl.json());
        // console.log(baseStageDetails);

        // const pokemonAnmSpirite = baseStageDetails.sprites.versions['generation-v']['black-white'].animated.front_default;

        // const secondStage = speciesEvolDetails.chain.evolves_to[0].species.name;
        // const secondUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${secondStage}`);
        // const secondStageDetails = await (secondUrl.json());
        // const pokeAnmSpriteSecond = secondStageDetails.sprites.versions['generation-v']['black-white'].animated.front_default;

        // let secondImg = document.createElement('img');
        // secondImg.src = pokeAnmSpriteSecond;
        // secondImg.style.width = '30%';
        // secondImg.style.maxHeight = '100%';
        // secondImg.style.height = 'auto';
        // secondImg.style.objectFit = 'contain';
        // secondImg.style.float = 'left';

        // const thirdStage = speciesEvolDetails.chain.evolves_to[0].evolves_to[0].species.name;
        // const thirdUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${thirdStage}`);
        // const thirdStageDetails = await (thirdUrl.json());
        // const pokeAnmSpriteThird = thirdStageDetails.sprites.versions['generation-v']['black-white'].animated.front_default;

        // let thirdImg = document.createElement('img');
        // thirdImg.src = pokeAnmSpriteThird;
        // thirdImg.style.width = '30%';
        // thirdImg.style.maxHeight = '100%';
        // thirdImg.style.height = 'auto';
        // thirdImg.style.objectFit = 'contain';
        // thirdImg.style.float = 'left';

        // consoleBox.appendChild(img);
        // consoleBox.appendChild(secondImg);
        // consoleBox.appendChild(thirdImg);

    } catch(error){
        console.log(error);
    }
}


async function playAudio(pokeData){

    try {
        // const pokemonName = document.getElementById("pokeName").value.toLowerCase();

        // if(!pokemonName) return;
        // // don't proceed if no pokemon is entered
        // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // const data = await response.json();

        if(!pokeData){
            throw new Error("Pokemon doesn't exist");
        }

        const pokemonID = pokeData.id;

        const audio = new Audio();

        audio.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonID}.ogg`

    audio.onerror = () => {
        console.log("audio not found for", pokemonName);
    }

    audio.play();

    //     audio.play().catch(error => {
    //         showError("couldn't play the audio");
    //     });
    } catch(error) {
        console.log(error);
    }
    


}

function showError(message){
    const popup = document.getElementById('errorPopup');
    popup.querySelector('p').textContent = message;
    popup.style.display = 'block';
}

function closeError() {
    document.getElementById('errorPopup').style.display = 'none';
}

function showStats(stats){
    const statsContainer = document.getElementById("txtBox");

    //clear any stats
    statsContainer.innerHTML = "";

    //first stat
    for(let i = 0; i < stats.length; i++){
        let statsItem = stats[i];
        let statElement = document.createElement("p");
        statElement.textContent = `${statsItem.stat.name}: ${statsItem.base_stat}`;
        statsContainer.appendChild(statElement);
    }

    // if(stats.length > 0){
    //     const firstStat = stats[0];
    //     const statElement = document.createElement("p");
    //     statElement.textContent = `${firstStat.stat.name}: ${firstStat.base_stat}`;
    //     statsContainer.appendChild(statElement);
    // }
}

async function showDexEntry(pokeData,speciesData){
    const dexContainer = document.getElementById("txtBox2");

    dexContainer.innerHTML = "";

    const pokeDexEntryNum = speciesData.pokedex_numbers[0].entry_number;
    const pokeDexEntryType = speciesData.pokedex_numbers[0].pokedex.name;
    const dexNumberEntry = document.createElement('p');
    dexNumberEntry.textContent =  pokeDexEntryType + " dex:" + " "+ pokeDexEntryNum;
    dexContainer.appendChild(dexNumberEntry);

    const abilityBox = [];
    const abiltyExplainBox = [];
    const pokeAbilities = pokeData.abilities;

    await addAbilities(abilityBox, abiltyExplainBox, pokeAbilities);

    async function addAbilities(abilityBox, abiltyExplainBox, pokeAbilities){

        // for(let i = 0; i < pokeAbilities.abilities.length; i++){



        //     const name = pokeAbilities.abilities[i].ability.name;
        //     const url = pokeAbilities.abilities[i].ability.url; 

        //     abilityBox.push(name);
        //     // // console.log(pokeAbilities[prop].ability.url);
        //     const abilitySearch = await fetch (url);
        //     const abilitySearchFind = await (abilitySearch.json());
        //     // // console.log(abilitySearchFind);
        //     abiltyExplainBox.push(abilitySearchFind.effect_entries[1].effect);
        //     abiltyExplainBox.push(abilitySearchFind.effect_changes[0].effect_entries[1].effect);

        // }

        for(const prop in pokeAbilities){
            // console.log(prop);
            // console.log(pokeAbilities[prop]);
            // console.log(pokeAbilities[prop].ability.name);
            
            abilityBox.push(pokeAbilities[prop].ability.name);
            // console.log(pokeAbilities[prop].ability.url);
            const abilitySearch = await fetch (pokeAbilities[prop].ability.url);
            const abilitySearchFind = await (abilitySearch.json());
            console.log(abilitySearchFind.effect_changes);

            abiltyExplainBox.push(abilitySearchFind.effect_entries[1].short_effect);
            if(!Array.isArray(abilitySearchFind.effect_changes)){
                abiltyExplainBox.push(abilitySearchFind.effect_changes[0].effect_entries[1].effect);
            }
            // console.log(abilityBox);
            // console.log(abiltyExplainBox);
        }
    }

    console.log(abilityBox);
    console.log(abiltyExplainBox);

    printAbilities(abilityBox, abiltyExplainBox);;

    function printAbilities(abilityBox, abiltyExplainBox){
        for(const namePoke in abilityBox){
            console.log(namePoke);
            if(namePoke === '1'){
                const name = document.createElement('p');
                name.textContent = 'hidden ability';
                dexContainer.appendChild(name);
            }
            const abilityName = document.createElement('p');
            abilityName.textContent = abilityBox[namePoke];
            dexContainer.appendChild(abilityName);
            const abilityNameExp = document.createElement('p');
            abilityNameExp.textContent = abiltyExplainBox[namePoke];
            dexContainer.appendChild(abilityNameExp);
        }
    }


    


    //get the english flavor text
    const englishEntries = speciesData.flavor_text_entries
        .filter(entry => entry.language.name === 'en' && entry.version.name === 'y')

    if(englishEntries.length > 0){
        const pokeDexDetails = document.createElement('p');
        pokeDexDetails.textContent = 'pokedex entry'
        dexContainer.appendChild(pokeDexDetails);
        const firstElement = document.createElement("p");
        firstElement.textContent = englishEntries[0].flavor_text;
        dexContainer.appendChild(firstElement);
    } else {
        const noEntry = document.createElement("p");
        noEntry.textContent = "No Pokédex entry available.";
        dexContainer.appendChild(noEntry);
    }

    // const firstDexEntry = speciesData[0];
    // const firstElement = document.createElement("p");
    // firstElement.textContent = firstDexEntry.flavor_text
    // dexContainer.appendChild(firstElement);
}




function backDefault(pokeData) {

    try{

        if(!pokeData){
            throw new Error("Pokemon doesn't exist");
        }

        // const pokemonName = document.getElementById("pokeName").value.toLowerCase();
        
        // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // if(!response.ok){
        //     throw new Error("Could not fetch resource");
        // }
        
        // const data = await response.json();
        const defRear = pokeData.sprites.back_default;
        const pokemonAnmSpirite = pokeData.sprites.versions['generation-v']['black-white'].animated.back_default;

        const img = document.getElementById("pokemonSprite");

        // img.src = defRear;
        img.src = pokemonAnmSpirite

        console.log(pokeData);
    }

    catch(error){
        console.error(error);
    }
    
}



function frontShiny(pokeData) {

    try{

        // const pokemonName = document.getElementById("pokeName").value.toLowerCase();
        
        // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // if(!response.ok){
        //     throw new Error("Could not fetch resource");
        // }
        
        // const data = await response.json();

        if(!pokeData){
            throw new Error("Pokemon doesn't exist");
        }

        const defRear = pokeData.sprites.front_shiny;
        const pokemonAnmSpirite = pokeData.sprites.versions['generation-v']['black-white'].animated.front_shiny;

        const img = document.getElementById("pokemonSprite");

        // img.src = defRear;
        img.src = pokemonAnmSpirite;

        console.log(pokeData);
    }

    catch(error){
        console.error(error);
    }
    
}


function backShiny(pokeData) {

    try{

        // const pokemonName = document.getElementById("pokeName").value.toLowerCase();
        
        // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // if(!response.ok){
        //     throw new Error("Could not fetch resource");
        // }
        
        // const data = await response.json();

        if(!pokeData){
            throw new Error("Pokemon doesn't exist");
        }

        const defRear = pokeData.sprites.back_shiny;
        const pokemonAnmSpirite = pokeData.sprites.versions['generation-v']['black-white'].animated.back_shiny;

        const img = document.getElementById("pokemonSprite");

        // img.src = defRear;
        img.src = pokemonAnmSpirite;

        console.log(pokeData);
    }

    catch(error){
        console.error(error);
    }
    
}

// async function desc(){
//     try {
        
//     } catch (error) {
//         console.error(error);
//     }
// }

