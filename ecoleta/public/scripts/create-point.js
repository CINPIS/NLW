
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(response => response.json()) //função anônima que return algo
    .then( states => { 

        for( const state of states) {
            //uma variavel estado dos varios estados 27
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` 
            //concatenação abreviado
    }     
  })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    console.log(event.target.value)
    const ufValue = event.target.value
    //onde esse evento foi executado, no select e vai trazdr ele aqui

    const index = event.target.selectedIndex
    stateInput.value = event.target.options[index].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ''
    citySelect.innerHTML = true

    fetch(url)
    .then(response  => response.json() ) //função anônima que return algo
    .then(cities => { 
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` 
        }     
        
        citySelect.disabled = false
  })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) //passagem por referencia

//habilita e popula cidades de acordo com o uf

/* ITENS DE COLETA */

const itemsColeta = document.querySelectorAll(".itens-grid li")

for (const items of itemsColeta){
    items.addEventListener("click", handleSelectedItem)
}

const itemsColetados = document.querySelector("input[name=items]")
//atualizar campo escondido com itens selecionados

let selectedItens = [] //começam vazios e preenchem de 0 a 5 os 1 a 6

function handleSelectedItem(event){

    const itemLI = event.target

    //toggle -add or remove a class with javascript - selected
    itemLI.classList.toggle("selected")

    const itensID = itemLI.dataset.id
    console.log("item id", itensID)
    /* colocar em input pra enviar os itens selectionados */
    //console.log(itemLI.dataset.id)
     /* to select id 1 to 6 */


    const alreadySelected = selectedItens.findIndex(item =>{
        const itemFound = item == itensID /* compara valores */
        return itemFound /* true or false para achar o index */
    })
    //console.log(alreadySelected)

    if(alreadySelected >= 0){ /* tem itens no array */
        //tirar da selecao
        const filteredItems = selectedItens.filter(item => {
            const itemISdifferent = item != itensID
            return itemISdifferent 
        })
        //console.log(filteredItems)
        selectedItens = filteredItems
    } else {
        selectedItens.push(itensID)
    }

    console.log('selectedItems', selectedItens)

    //colcoar itens na array, verificar se tira ou adiciona item se double click 
    itemsColetados.value = selectedItens
   //<input type="hidden" name="items" value="show the numbers">
}
