
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

const Transactions = [
    {
     
       description: 'luz',
       amount: 500000,
       date: '23/01/2021',
    }, 
   {
  
    description: 'Website',
    amount: -80000,
    date: '23/01/2021',
},
    { 
     
       description: 'internet',
       amount: 30000,
       date: '23/01/2021',
},
    { 
       
        description: 'APP - React Native',
        amount: -20000,
        date: '23/01/2021',
     },
]


// somar entradas e saidas, remover das entrafas o valor das saidas,
// assim terei o total
const transaction = {
    all:
         [
        {
         
           description: 'luz',
           amount: 500000,
           date: '23/01/2021',
        }, 
       {
      
        description: 'Website',
        amount: -80000,
        date: '23/01/2021',
    },
        { 
         
           description: 'internet',
           amount: 30000,
           date: '23/01/2021',
    },
        { 
           
            description: 'APP - React Native',
            amount: -20000,
            date: '23/01/2021',
         },
    ],


    add(Transaction){
        transaction.all.push(Transaction) // se der erro Trocar, para transaction

        App.reload()


    },
  
    remove(index){
      transaction.all.splice(index, 1) // se der erro Troca o  nome aqui
     
      App.reload()
         
    },


    incomes(){
        // somar as entradas
       let income = 0;
        // pegar todas as transacoes
        transaction.all.forEach(transaction  => {
     // para cada transacao, se ela for maior que zero
       //somar a uma variavel
       if(transaction.amount > 0 ){
           income += transaction.amount;
          }
       })
        return income;

    },
    expense(){  

       let expense = 0;
       
       transaction.all.forEach(transaction  => {
       if(transaction.amount < 0 ){
          expense += transaction.amount;
          }
       })
        return expense;
       
    },

    total(){
        return transaction.incomes() + transaction.expense();
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
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>
   
        `
     return html

     },

     updateBalance(){
    document
       .getElementById('incomeDisplay')
       .innerHTML = Utils.formatCurrency(transaction.incomes())
    document
       .getElementById('expenseDisplay')
       .innerHTML = Utils.formatCurrency(transaction.expense())

    document
       .getElementById('totalDisplay')
       .innerHTML = Utils.formatCurrency(transaction.total())

     },


    clearTransactions(){
       DOM.transactionsContainer.innerHTML = ""

    }

}

const Utils = {
   
    formatCurrency(value){
       const signal = Number(value) < 0 ? "-" : ""

       value = String(value).replace(/\D/g, "")

       value = Number(value) / 100

       value = value.toLocaleString("pt-BR", {
           style: "currency",
           currency: "BRL"

       })

       return signal + value
    }

} 

const Form = {

   

    formatData(){
    console.log('Formartar os dados')

    },

    validateFields(){
       console.log('Validar os campos')
    },
    
    submit(event){
       event.preventDefault()

       //verificar se toda as informaçoes foram preenchidas
       Form.validateFields()
       //formatar os dados para salvar

       //salvar
       //apagar os dados do dormulario
       //mofal feche
       //atualizar a aplicaçao




    }



}


const App = {
    init() {

        transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
        
        
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },


}

App.init()


transaction.remove(3)



