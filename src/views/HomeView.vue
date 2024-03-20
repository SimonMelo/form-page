<template>
  <div>
    <img src="../../public/img/nameLincolin.png" class="img-fluid centered-image" />
    <section class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div class="card-container">
        <a-tabs v-model:activeKey="activeKey" centered>
          <a-tab-pane key="1" tab="Informações Pessoais">
            <ContactInfo
              :formState="formState"
              :activeKey="activeKey"
              :validateStatus="validateStatus.contactStatus"
              :helpText="helpText.contactText"
              :permissionOkPreference="permissionOkPreference"
              @update:activeKey="handleUpdateActiveKey"
              @update:permissionOkPreference="handleUpdatePermission"
            />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Objetivos e Preferências" :disabled="permissionOkPreference">
            <PreferenceInfo
              :formState="formState"
              :activeKey="activeKey"
              :validateStatus="validateStatus.preferenceStatus"
              :helpText="helpText.preferenceText"
              @update:activeKey="handleUpdateActiveKey"
              @update:permissionOkAddInfo="handleUpdatePermissionAdd"
              @update:permissionOkPreference="handleUpdatePermission"
            />
          </a-tab-pane>
          <a-tab-pane key="3" tab="Informações Adicionais" :disabled="permissionOkAddInfo">
            <ExtraInfo
              :formState="formState"
              :activeKey="activeKey"
              :validateStatus="validateStatus.extraStatus"
              :helpText="helpText.extraText"
              @update:activeKey="handleUpdateActiveKey"
              @update:permissionOkAddInfo="handleUpdatePermissionExtra"
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
import { formPOST } from '../services/submit-form'
import { ref, reactive } from 'vue'

const activeKey = ref('1')

const permissionOkPreference = ref(true)
const permissionOkAddInfo = ref(true)

const handleUpdateActiveKey = (newValue) => {
  activeKey.value = newValue
}

const handleUpdatePermission = (newValue) => {
  permissionOkPreference.value = newValue
}

const handleUpdatePermissionAdd = (newValue) => {
  permissionOkAddInfo.value = newValue
}

const handleUpdatePermissionExtra = (newValue) => {
  permissionOkAddInfo.value = newValue
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

const finallyForm = () => {
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

  formPOST(formData)
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
