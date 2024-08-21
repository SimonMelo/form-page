<template>
  <div>
    <img src="../../public/img/nameLincolin.png" class="img-fluid centered-image" />
    <section class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div class="card-container">
        <a-tabs v-model:activeKey="activeKey" centered>
          <a-tab-pane key="1" tab="Informações Pessoais" disabled>
            <ContactInfo
              :formState="formState"
              :activeKey="activeKey"
              :validateStatus="validateStatus.contactStatus"
              :helpText="helpText.contactText"
              @update:activeKey="handleUpdateActiveKey"
            />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Objetivos e Preferências" disabled>
            <PreferenceInfo
              :formState="formState"
              :activeKey="activeKey"
              :validateStatus="validateStatus.preferenceStatus"
              :helpText="helpText.preferenceText"
              @update:activeKey="handleUpdateActiveKey"
            />
          </a-tab-pane>
          <a-tab-pane key="3" tab="Informações Adicionais" disabled>
            <ExtraInfo
              :formState="formState"
              :activeKey="activeKey"
              :validateStatus="validateStatus.extraStatus"
              :helpText="helpText.extraText"
              @update:activeKey="handleUpdateActiveKey"
              :finallyForm="finallyForm"
            />
          </a-tab-pane>
        </a-tabs>
      </div>
    </section>
    <img src="../../public/img/imovelIcon.png" class="img-fluid centered-image-icon" />
  </div>
</template>

<script setup>
import ContactInfo from '../components/ContactInfo.vue'
import PreferenceInfo from '../components/PreferenceInfo.vue'
import ExtraInfo from '../components/ExtraInfo.vue'
import { ref, reactive } from 'vue'
import { api } from '@/config/api';

const activeKey = ref('1')
const SHEET_ID = "1WLxWdHDNrKC01Y7tZ3pbEOUBLb3V2VRq14quy2w6OdI"
const API_KEY = "AIzaSyAcnqXY5R5zk3c0GwduS2HJ3bKT8yB7JQQ"

const handleUpdateActiveKey = (newValue) => {
  activeKey.value = newValue
}

const formState = reactive({
  contact: {
    name: '',
    email: '',
    phone: ''
  },
  preference: {
    immobile: '',
    location: '',
    locationOther: '',
    price: ''
  },
  extra: {
    metImmobile: '',
    time: '',
    addInfo: ''
  }
})

const finallyForm = async () => {
  const { contact, preference, extra } = formState

  const formData = {
    contact: {
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    },
    preference: {
      immobile: preference.immobile,
      location: preference.location,
      locationOther: preference.locationOther,
      price: preference.price
    },
    extra: {
      metImmobile: extra.metImmobile,
      time: extra.time,
      addInfo: extra.addInfo
    }
  }
  const range = 'Sheet1!A1:J1'
  const valueInput = "RAW"
  const url = `${SHEET_ID}/values/${range}:append?valueInputOption=${valueInput}&key=${API_KEY}`

  try {
    const response = await api.post(url, {
      range: range,
      majorDimension: 'ROWS',
      values: [formData]
    })
    if (response.status === 200) {
      console.log('Data appended:', response.data)
    } else {
      console.error('Error appending data:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('Error appending data:', error)
  }

}

const validateStatus = ref({
  contactStatus: {
    name: '',
    email: '',
    phone: ''
  },
  preferenceStatus: {
    immobile: '',
    location: '',
    locationOther: '',
    price: ''
  },
  extraStatus: {
    metImmobile: '',
    time: '',
    addInfo: ''
  }
})

const helpText = ref({
  contactText: {
    name: '',
    email: '',
    phone: ''
  },
  preferenceText: {
    immobile: '',
    location: '',
    locationOther: '',
    price: ''
  },
  extraText: {
    metImmobile: '',
    time: '',
    addInfo: ''
  }
})
</script>
