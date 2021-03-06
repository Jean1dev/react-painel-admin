const prodUrl = 'https://if-api-gateway.herokuapp.com'
const localUrl = 'http://localhost:8080'
const localWindowsUrl = 'http://192.168.1.2:8080'
let baseUrl = process.env.NODE_ENV === 'development' ? localUrl : prodUrl

if (process.env.NODE_ENV === 'development' && false) {
    baseUrl = localWindowsUrl
}

baseUrl = prodUrl // so pra testar direto com as apis em producao
export { baseUrl }