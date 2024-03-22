import axios from 'axios'

export const formPOST = (body) => {
  const newData = {
    contact: {
      name: body?.contact?.name,
      email: body?.contact?.email,
      phone: body?.contact?.phone
    },
    preference: {
      immobile: body?.preference?.immobile,
      location: body?.preference?.location,
      locationOther: body?.preference?.locationOther,
      price: body?.preference?.price
    },
    extra: {
      metImmobile: body?.extra?.metImmobile,
      time: body?.extra?.time,
      addInfo: body?.extra?.addInfo
    }
  }
  return axios.post('http://localhost:3000/api/submit-form', newData)
}
