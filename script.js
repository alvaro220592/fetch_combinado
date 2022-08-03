/**
 * Buscando dados básicos de endereço a partir do CEP
 */
function buscaCep(){
    let cep = document.getElementById('campo_cep').value
    let array_exemplo = [1, 2, 3];

    fetch(`https://viacep.com.br/ws/${cep}/json`)
    .then(res => res.json())
    .then(data => {
        
        document.querySelector('tbody').innerHTML = '';
        
        array_exemplo.forEach(item => {
            document.querySelector('tbody').innerHTML += `
                <tr>
                    <td id="lat_lon_${item}"></td>
                    <td>${data.cep}</td>
                    <td>${data.logradouro}</td>
                    <td>${data.bairro}</td>
                    <td>${data.localidade}</td>
                    <td>${data.uf}</td>
                </tr>
            `

            // Aqui poderia ser um loading pois demora um pouco mais pra chegar o dado
            document.getElementById(`lat_lon_${item}`).innerText = '...';

            buscaLatLon(data.logradouro, data.bairro, data.localidade, `lat_lon_${item}`)
        })
        
    })
    .catch(error => console.log(error))
}

/**
 * Buscando dados mais avançados do endereço a partir dos dados fornecidos na 1ª pesquisa
 * para popular uma das colunas da tabela
 */
function buscaLatLon(logra, bairro, cidade, id_td){
    fetch(`https://nominatim.openstreetmap.org/?addressdetails=1&street=${logra}&county=${bairro}&city=${cidade}&format=json&limit=1`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.getElementById(id_td).innerText = `${data[0].lat}, ${data[0].lon}`
    })
    .catch(erro => console.log(erro))
}