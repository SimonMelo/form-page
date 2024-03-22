<template>
  <div>
    <section class="row justify-content-center">
      <div class="col-md-9">
        <div>
          <p id="p-text">Antes de tudo, nos informe suas informações para contato!</p>
        </div>

        <a-form :model="localContact.contact" @finish="handleButton">
          <div class="input-space">
            <label>Nome Completo:</label>
            <a-form-item :validateStatus="status.name" :help="text.name" required>
              <a-input
                placeholder="Seu nome"
                v-model:value="localContact.contact.name"
                @input="selectorInput('name', $event)"
              >
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
          </div>

          <div class="input-space">
            <label>E-mail:</label>
            <a-form-item :validateStatus="status.email" :help="text.email" required>
              <a-input
                placeholder="email@.com"
                v-model:value="localContact.contact.email"
                @input="selectorInput('email', $event)"
              >
                <template #prefix>
                  <MailOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
          </div>

          <div class="input-space">
            <label>Telefone:</label>
            <a-form-item :validateStatus="status.phone" :help="text.phone" required>
              <a-input
                placeholder="(99) 99999-9999"
                v-model:value="localContact.contact.phone"
                @input="selectorInput('phone', $event)"
              >
                <template #prefix>
                  <PhoneOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
          </div>

          <div class="btn-continue" style="text-align: center">
            <a-button type="primary" html-type="submit">Continue</a-button>
          </div>
        </a-form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, defineProps, defineEmits } from 'vue'
import { UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons-vue'
import { matchEmail } from '../utils/emailUtils'
import { matchPhone, maskPhone } from '../utils/phoneUtils'

const emit = defineEmits(['update:activeKey'])
const props = defineProps(['formState', 'contactText', 'contactStatus'])

const localContact = reactive({ ...props.formState })
const status = reactive({ ...props.contactStatus })
const text = reactive({ ...props.contactText })

const selectorInput = (fieldName, event) => {
  const { value } = event.target
  let nameValue
  let phoneValue
  let emailValue
  switch (fieldName) {
    case 'name':
      nameValue = value.slice(0, 120).trimStart()
      localContact.contact.name = nameValue
      status.name = ''
      text.name = ''
      break

    case 'email':
      emailValue = value.slice(0, 120).trim()
      localContact.contact.email = emailValue
      status.email = ''
      text.email = ''
      break

    case 'phone':
      phoneValue = value.replace(/\D/g, '').substring(0, 11)
      localContact.contact.phone = maskPhone(phoneValue)
      status.phone = ''
      text.phone = ''
      break

    default:
      break
  }
}

const validateField = (fieldName) => {
  const value = localContact.contact[fieldName]
  const validation = { valid: true, message: '' }

  if (!value) {
    validation.valid = false
    validation.message = 'Preencha esse campo.'
    status[fieldName] = 'error'
  } else if (fieldName === 'email' && !matchEmail(value)) {
    validation.valid = false
    validation.message = 'Preencha corretamente.'
    status[fieldName] = 'warning'
  } else if (fieldName === 'phone' && !matchPhone(value)) {
    validation.valid = false
    validation.message = 'Preencha corretamente.'
    status[fieldName] = 'warning'
  } else {
    status[fieldName] = ''
  }

  text[fieldName] = validation.message

  return validation
}

const handleButton = async () => {
  const validName = validateField('name')
  const validEmail = validateField('email')
  const validPhone = validateField('phone')

  if (validName.valid && validEmail.valid && validPhone.valid) {
    emit('update:activeKey', '2')
  }
}
</script>
