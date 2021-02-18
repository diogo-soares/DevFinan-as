
const Modal = {
   
    open(){
    //abri modal
    //adicionar a class active ao modal
       document
        .querySelector('.modal-overlay')
        .classList
        .add('active')
    },
    close(){
    // fechar o modal
    // remover a class active do modal
        document
         .querySelector('.modal-overlay')
         .classList
         .remove('active')
    }
}

const transactions = [
    {
       id: 1,
       description: 'luz',
       amount: -50000,
       date: '23/01/2021',
    }, 
   {
    id: 2,
    description: 'Website',
    amount: 500000,
    date: '23/01/2021',
},
    { 
       id: 3,
       description: 'internet',
       amount: -20000,
       date: '23/01/2021',
},
    { 
        id: 4,
        description: 'APP - React Native',
        amount: 20000,
        date: '23/01/2021',
     },
]


// somar entradas e saidas, remover das entrafas o valor das saidas,
// assim terei o total
const transaction = {
    incomes(){
        // somar as entradas

    },
    expense(){
        //somar as saidas
    },
    totral(){
        // entradas - saidas
    }
}

//substituir os dados do HTML com os Dados do js

const DOM = {
        transactionsContainer: document.querySelector('#data-table tbody'),
      
       addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)  

        DOM.transactionsContainer.appendChild(tr)

     },
     innerHTMLTransaction(transaction){
        
        const CSSclass = transaction.amount > 0 ? "income" :
        "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${transaction.amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>
   
        `

     return html


     }

}

const Utils = {
   
    formatCurrency(value){
       const signal = Number(value) < 0 ? "-" : ""
    }
 

} 

transactions.forEach(function(transaction) {
    DOM.addTransaction(transaction)
})