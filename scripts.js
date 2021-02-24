
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

const Storage = {
    get() {
       return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
  
    },
    set(Transactions) {
         localStorage.setItem("dev.finances:transactions", 
         JSON.stringify(Transactions))
  
  
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
    all: Storage.get(),
        


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
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index  

        DOM.transactionsContainer.appendChild(tr)

     },
     innerHTMLTransaction(transaction, index){
        
        const CSSclass = transaction.amount > 0 ? "income" :
        "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
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

    formatAmount(value) {
       value = Number(value) * 100
       


       return value
    },

    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },
   
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

    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
       return {

          
           description: Form.description.value,
           amount: Form.amount.value,
           date: Form.date.value
       }

    },


    validateFields(){
        const {description, amount, date} = Form.getValues()
       

        if(description.trim() === "" || 
           amount.trim() === "" ||
           date.trim() === ""){

               throw new Error("Por Favor, Preencha todos os campos")

        }

    },

    formatValues() {
  
        let {description, amount, date} = Form.getValues()
         

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

       return{
          
         description,
         amount,
         date



       }
    },
    

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },




    submit(event){
       event.preventDefault()
   
       try {
            //verificar se toda as informaçoes foram preenchidas
           Form.validateFields()
           //formatar os dados para salvar
           const Transaction = Form.formatValues()
           //salvar
           transaction.add(Transaction)
           //apagar os dados do dormulario
           Form.clearFields()
           //mofal feche
           Modal.close()
           //atualizar a aplicaçao

      } catch (error) {
       alert(error.message)
          
       }
    }
}




const App = {
    init() {

        transaction.all.forEach((transaction, index) => {
            DOM.addTransaction(transaction, index)
        })
        
        DOM.updateBalance()
        
        Storage.set(transaction.all)
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },


}

App.init()






