const situacoes = [
    {
        key: 'SOLICITADO',
        class: 'secondary'
    },
    {
        key: 'APROVADO',
        class: 'success'
    },
    {
        key: 'REPROVADO',
        class: 'danger'
    },
    {
        key: 'CONCLUIDO',
        class: 'primary'
    }
]

export default situacao => {
    return situacoes.find(element => element.key === situacao).class
}