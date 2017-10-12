module.exports = {
    getError(code , message ) {
        error = {
            code : code,
            message: message? message : getMessage(code)
        }
        return error
    } ,
    getMessage(code) {
        switch(code) {
            case 200:
                return "Sucesso"
            case 201:
                return "Criado com Sucesso"
            case 400:
                return "Requisação inválida"
            case 401:
                return "Acesso negado"
            case 404:
                return "Não encontrado"
            case 500:
                return "Erro no servidor"
            default:
                return "Status da requisição : "+code
        }
    }
}