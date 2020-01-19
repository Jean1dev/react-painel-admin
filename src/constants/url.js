const prodUrl = ''
const localUrl = 'http://localhost:8080'
const localWindowsUrl = 'http://192.168.1.2:8080'
let baseUrl = process.env.NODE_ENV === 'development' ? localUrl : prodUrl

if (process.env.NODE_ENV === 'development' && true) {
    baseUrl = localWindowsUrl
}

export { baseUrl }