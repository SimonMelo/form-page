<template>
  <img src="../../public/img/nameLincolin.png" class="img-fluid centered-image" />
  <section class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
    <div class="card-container">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" tab="Informações Pessoais">
          <ContactInfo
            :formState="formState.contact"
            :activeKey="activeKey"
            :validateStatus="validateStatus.contactStatus"
            :loading="loading"
            :helpText="helpText.contactText"
            :permissionOkPreference="permissionOkPreference"
            @update:activeKey="handleUpdateActiveKey"
            @update:permissionOkPreference="handleUpdatePermission"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Objetivos e Preferências" :disabled="permissionOkPreference">
          <PreferenceInfo
            :formState="formState.preference"
            :activeKey="activeKey"
            :validateStatus="validateStatus.preferenceStatus"
            :loading="loading"
            :helpText="helpText.preferenceText"
            @update:activeKey="handleUpdateActiveKey"
            @update:permissionOkAddInfo="handleUpdatePermissionAdd"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Informações Adicionais" :disabled="permissionOkAddInfo"
          >Tab 3</a-tab-pane
        >
      </a-tabs>
    </div>
  </section>
  <img src="../../public/img/imovelIcon.png" class="img-fluid centered-image-icon" />
</template>

<script setup>
import ContactInfo from '../components/ContactInfo.vue'
import PreferenceInfo from '../components/PreferenceInfo.vue'
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
  }
})

const loading = ref({
  loadingButton: false,
  loadingScreen: false
})

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
  }
})
</script>
../components/PreferenceInfo.vue
