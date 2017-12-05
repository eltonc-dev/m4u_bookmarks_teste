

module.exports = {

    get(code , message , data ) {
        responseStr = {
            status : code >= 400 ? 'erro' : 'sucesso',
            message: message? message : this.getMessage(code),
            data: code >= 400? null : data
        }
        if(code >= 400 & data) {
            responseStr.error = {
                code: data.code ? data.code : '00',
                name: data.name ? data.name : data,
                message: data.message ? data.message : data
            }
        }
        return responseStr
    } ,
    getMessage(code) {
        switch(code) {
            case 200:
                return "Operação realizada com sucesso"
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