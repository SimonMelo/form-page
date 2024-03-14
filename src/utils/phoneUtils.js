export const matchPhone = (phone) => {
  const cleanedPhone = phone?.replace(/\D/g, '')

  const phoneRegex = /^\d{11}$/
  return phoneRegex.test(cleanedPhone)
}

export const maskPhone = (v) => {
  v = v.replace(/\D/g, '')
  v = v.replace(/^(\d\d)(\d)/g, '($1) $2')
  v = v.replace(/(\d{5})(\d)/, '$1-$2')
  return v
}
